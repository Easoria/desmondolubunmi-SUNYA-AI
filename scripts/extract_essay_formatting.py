#!/usr/bin/env python3
"""Re-extract where-to-begin (and essay blocks) with PDF-accurate formatting."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF = Path("/tmp/sunya_master_refined.pdf")
DOC = fitz.open(PDF)

SENTENCE_END = re.compile(r"[.!?…][\"”')\]]*$")
SOFT_END = re.compile(r"[,;:—–\-]$")

SECTION_HEADINGS = [
    "1. The Governing Principle",
    "2. The Diagnostic Framework — Reading the State",
    "Zone 1 — Survival Crisis",
    "Zone 2 — Nervous System Collapse",
    "Zone 3 — Emotional Accumulation",
    "Zone 4 — Mental Fragmentation",
    "Zone 5 — The Hollow Seeker",
    "3. Phase One — The External Audit",
    "4. Phase Two — The Internal Entry Point",
    "5. Phase Three — Root Cause Work",
    "Step 1 — Establishing the Witness",
    "Step 2 — Disidentification",
    "Step 3 — Direct Self-Inquiry",
    "Step 4 — Resting as Awareness",
    "6. The Lever Map — Quick Reference",
    "7. Pacing, Safety, and the Kundalini Dimension",
]

BOLD_LABELS = [
    "The Rule",
    "The practitioner’s core skill",
    "The practitioner's core skill",
    "Why external first",
    "The audit rule",
    "The universal starting point",
    "The expansion rule",
    "The rule: stability before depth",
    "A note on mixed presentations",
    "A critical note",
]

SUBHEADING_EXACT = {
    "Why this rule breaks down",
    "The bottleneck principle",
    "The six-pillar audit — questions to ask",
    "Expansion from Breath — the symptom-based map",
    "The root cause practices — in order of approach",
    "Breath first.",
    "The pacing principle",
    "General safety guardrails",
    "The kundalini dimension",
    "How to support this process:",
    "What not to do:",
    "Signs that the pace needs to slow:",
}

INLINE_LABEL_RE = re.compile(
    r"^(Signs:|First lever:|Practices:|Appropriate for:|"
    r"Signs of readiness for Step \d+:|If compromised:)\s*"
)

BREAK_START_RE = re.compile(
    r"^(Step \d+|Zone \d+|Lever \d+|Signs:|First lever:|Practices:|"
    r"Appropriate for:|Signs of readiness|If compromised:|A critical note|"
    r"If the primary|The Rule|The practitioner|Why external|The audit rule|"
    r"The universal|The expansion|The rule:|A note on|Why this rule|"
    r"The bottleneck|The six-pillar|Expansion from|The root cause|"
    r"The pacing|General safety|The kundalini|How to support|What not to|"
    r"Signs that the pace|Sleep —|Nutrition —|Connection —|Environment —|"
    r"Nature —|Sustenance —|Do not take|Attempting deep|Begin with Breath|"
    r"Once Breath|One practice|Assess the six|What each lever)"
)


def is_italic_font(font: str, flags: int) -> bool:
    return "Italic" in font or bool(flags & 2)


def bullet_centers(page):
    ys = []
    for d in page.get_drawings():
        r = d.get("rect")
        if not r:
            continue
        if 1 < r.width < 8 and 1 < r.height < 8 and 60 < r.x0 < 105 and d.get("fill"):
            ys.append((r.y0 + r.y1) / 2)
    return ys


def extract_page_lines(page_index: int):
    page = DOC[page_index]
    bullets = bullet_centers(page)
    lines = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            spans = []
            for span in line["spans"]:
                text = span["text"]
                if text == "":
                    continue
                spans.append(
                    {
                        "text": text,
                        "italic": is_italic_font(span["font"], span["flags"]),
                        "bold": "Bold" in span["font"] or bool(span["flags"] & 16),
                        "size": span["size"],
                        "x": span["bbox"][0],
                    }
                )
            if not spans:
                continue
            y = (line["bbox"][1] + line["bbox"][3]) / 2
            x0 = line["bbox"][0]
            full = "".join(span["text"] for span in spans)
            is_bullet = any(abs(bullet_y - y) <= 8 for bullet_y in bullets)
            lines.append(
                {
                    "page": page_index,
                    "y": y,
                    "x0": x0,
                    "text": full,
                    "spans": spans,
                    "size": spans[0]["size"],
                    "bullet": is_bullet,
                }
            )
    lines.sort(key=lambda item: (item["page"], item["y"]))
    return lines


def clean_spans(spans):
    out = []
    for span in spans:
        text = re.sub(r"\s+", " ", span["text"])
        if text == " ":
            if out and not out[-1]["text"].endswith(" "):
                out[-1]["text"] += " "
            continue
        if not text.strip():
            continue
        italic = bool(span.get("italic"))
        bold = bool(span.get("bold"))
        if out and out[-1]["italic"] == italic and out[-1].get("bold") == bold:
            if out[-1]["text"].endswith(" ") or text.startswith(" "):
                out[-1]["text"] += text
            else:
                out[-1]["text"] += text
        else:
            out.append({"text": text, "italic": italic, "bold": bold})
    if out:
        out[0]["text"] = out[0]["text"].lstrip()
        out[-1]["text"] = out[-1]["text"].rstrip()
        # collapse double spaces after bold labels
        for span in out:
            span["text"] = re.sub(r" {2,}", " ", span["text"])
    return [span for span in out if span["text"]]


def join_line_spans(left, right):
    if not left:
        return [dict(span) for span in right]
    out = [dict(span) for span in left]
    if (
        out
        and right
        and not out[-1]["text"].endswith(" ")
        and not right[0]["text"].startswith(" ")
    ):
        if out[-1]["italic"] == right[0]["italic"] and out[-1].get("bold") == right[0].get(
            "bold"
        ):
            out[-1]["text"] = out[-1]["text"] + " " + right[0]["text"]
            for span in right[1:]:
                out.append(dict(span))
            return clean_spans(out)
        out.append({"text": " ", "italic": False, "bold": False})
    for span in right:
        out.append(dict(span))
    return clean_spans(out)


def should_break_before(next_text: str) -> bool:
    stripped = next_text.strip()
    if stripped in SECTION_HEADINGS or stripped in SUBHEADING_EXACT:
        return True
    if any(stripped.startswith(heading + " ") for heading in SECTION_HEADINGS):
        return True
    if BREAK_START_RE.match(stripped):
        return True
    if INLINE_LABEL_RE.match(stripped):
        return True
    return False


def apply_label_bold(spans, text):
    for label in BOLD_LABELS:
        if text.startswith(label):
            consumed = 0
            new = [{"text": label, "bold": True, "italic": False}]
            for span in spans:
                if consumed >= len(label):
                    new.append(dict(span))
                    continue
                take = min(len(span["text"]), len(label) - consumed)
                consumed += take
                leftover = span["text"][take:]
                if leftover:
                    new.append({**span, "text": leftover})
            cleaned = clean_spans(new)
            if len(cleaned) >= 2:
                cleaned[0]["text"] = cleaned[0]["text"].rstrip()
                if not cleaned[1]["text"].startswith(" "):
                    cleaned[1]["text"] = " " + cleaned[1]["text"]
            return clean_spans(cleaned)

    match = INLINE_LABEL_RE.match(text)
    if match:
        label = match.group(1)
        rest = text[match.end() :]
        spans_out = [{"text": label, "italic": True, "bold": True}]
        if rest:
            spans_out.append({"text": " " + rest, "italic": False, "bold": False})
        return clean_spans(spans_out)
    return spans


def split_heading(text: str):
    for heading in sorted(SECTION_HEADINGS, key=len, reverse=True):
        if text == heading:
            return heading, ""
        if text.startswith(heading + " "):
            return heading, text[len(heading) :].strip()
    return None, text


def slim_spans(spans):
    return [{key: value for key, value in span.items() if key == "text" or value} for span in spans]


def blocks_to_paragraphs(blocks):
    paragraphs = []
    for block in blocks:
        if block["type"] == "list":
            for item in block["items"]:
                paragraphs.append("".join(span["text"] for span in item).strip())
        else:
            paragraphs.append("".join(span["text"] for span in block["spans"]).strip())
    return [paragraph for paragraph in paragraphs if paragraph]


CONT_END = re.compile(
    r"(?i)\b(a|an|the|of|and|or|to|for|with|from|into|as|by|in|on|at|onto|upon|"
    r"over|under|between|through|without|within|than|then|but|nor|so|yet|"
    r"if|when|while|where|which|who|whom|whose|that|this|these|those|"
    r"my|your|his|her|its|our|their|not|no|every|each|some|any|all|"
    r"both|either|neither|such|other|another|same|own)$"
)


def merge_broken_paragraph_blocks(blocks, *, allow_label_break: bool):
    """Join PDF soft-wrap leftovers that were wrongly split mid-sentence."""
    out = []
    for block in blocks:
        if block["type"] != "paragraph" or not out or out[-1]["type"] != "paragraph":
            out.append(block)
            continue
        prev = "".join(span["text"] for span in out[-1]["spans"]).rstrip()
        cur = "".join(span["text"] for span in block["spans"]).lstrip()
        if SENTENCE_END.search(prev):
            out.append(block)
            continue
        if allow_label_break and should_break_before(cur):
            out.append(block)
            continue
        if CONT_END.search(prev) or prev.endswith((",", ";", ":", "—", "–", "-")) or (
            cur and cur[0].islower()
        ):
            merged = join_line_spans(out[-1]["spans"], block["spans"])
            out[-1] = {"type": "paragraph", "spans": merged}
            continue
        out.append(block)
    return out


def main():
    start_page = None
    for index in range(DOC.page_count):
        text = DOC[index].get_text()
        if (
            "THE ORDER OF OPERATIONS" in text
            and "1. The Governing Principle" in text
            and "Why this rule breaks down" in text
        ):
            start_page = index
    if start_page is None:
        raise SystemExit("Order of Operations body page not found")

    raw_lines = []
    for index in range(start_page, DOC.page_count):
        raw_lines.extend(extract_page_lines(index))

    start_idx = next(
        i for i, line in enumerate(raw_lines) if line["text"].strip() == "1. The Governing Principle"
    )
    raw_lines = raw_lines[start_idx:]

    logical = []
    buf = None
    for line in raw_lines:
        line = {
            **line,
            "spans": [dict(span) for span in line["spans"]],
            "text": line["text"],
        }
        if buf is None:
            buf = line
            continue

        if line["bullet"]:
            logical.append(buf)
            buf = line
            continue

        next_text = line["text"].strip()
        if should_break_before(next_text):
            logical.append(buf)
            buf = line
            continue

        if buf["bullet"] and not line["bullet"] and line["x0"] >= 80:
            prev = buf["text"].rstrip()
            if (not SENTENCE_END.search(prev)) or SOFT_END.search(prev):
                buf["spans"] = join_line_spans(buf["spans"], line["spans"])
                buf["text"] = "".join(span["text"] for span in buf["spans"]).strip()
                continue
            logical.append(buf)
            buf = line
            continue

        if (not buf["bullet"]) and (not line["bullet"]) and line["x0"] < 80:
            prev = buf["text"].rstrip()
            words = prev.split()
            if (
                len(words) <= 8
                and not SENTENCE_END.search(prev)
                and not SOFT_END.search(prev)
                and not any(span["italic"] for span in buf["spans"])
            ):
                logical.append(buf)
                buf = line
                continue
            if SOFT_END.search(prev) or not SENTENCE_END.search(prev):
                buf["spans"] = join_line_spans(buf["spans"], line["spans"])
                buf["text"] = "".join(span["text"] for span in buf["spans"]).strip()
                continue

        logical.append(buf)
        buf = line
    if buf:
        logical.append(buf)

    for line in logical:
        line["spans"] = clean_spans(line["spans"])
        line["text"] = "".join(span["text"] for span in line["spans"]).strip()
        line["spans"] = apply_label_bold(line["spans"], line["text"])
        line["text"] = "".join(span["text"] for span in line["spans"]).strip()

    sections = []
    current = None
    list_buf = []

    def end_list():
        nonlocal list_buf
        if current is not None and list_buf:
            current["blocks"].append({"type": "list", "items": list_buf})
            list_buf = []

    for line in logical:
        text = line["text"]
        if not text:
            continue
        heading, rest = split_heading(text)
        if heading:
            end_list()
            if current:
                sections.append(current)
            current = {"heading": heading, "blocks": []}
            if rest:
                current["blocks"].append({"type": "paragraph", "spans": [{"text": rest}]})
            continue
        if current is None:
            continue

        if line["bullet"]:
            list_buf.append(line["spans"] if line["spans"] else [{"text": text}])
            continue

        end_list()

        if text in SUBHEADING_EXACT or (
            len(text.split()) <= 7
            and not SENTENCE_END.search(text)
            and "," not in text
            and text[:1].isupper()
            and not any(span.get("italic") for span in line["spans"])
        ):
            current["blocks"].append({"type": "subheading", "spans": [{"text": text, "bold": True}]})
            continue

        match = re.match(r"^(Lever \d+ — [A-Za-z][A-Za-z/\- ]*?)\s+(.*)$", text)
        if match and current["heading"].startswith("6."):
            name = match.group(1)
            after = match.group(2)
            spans = [{"text": name, "bold": True}]
            italic = "".join(span["text"] for span in line["spans"] if span.get("italic")).strip()
            if italic:
                spans.append({"text": " " + italic, "italic": True})
                remainder = text[len(name) :].strip()
                if remainder.startswith(italic):
                    tail = remainder[len(italic) :].strip()
                    if tail:
                        spans.append({"text": " " + tail})
            elif after:
                spans.append({"text": " " + after})
            current["blocks"].append({"type": "paragraph", "spans": clean_spans(spans)})
            continue

        current["blocks"].append(
            {"type": "paragraph", "spans": line["spans"] if line["spans"] else [{"text": text}]}
        )

    end_list()
    if current:
        sections.append(current)

    expected = set(SECTION_HEADINGS)
    got = {section["heading"] for section in sections}
    missing = expected - got
    if missing:
        raise SystemExit(f"Missing sections: {sorted(missing)}")

    wto_sections = []
    for section in sections:
        clean_blocks = []
        for block in section["blocks"]:
            if block["type"] == "list":
                clean_blocks.append(
                    {"type": "list", "items": [slim_spans(item) for item in block["items"]]}
                )
            else:
                clean_blocks.append({"type": block["type"], "spans": slim_spans(block["spans"])})
        clean_blocks = merge_broken_paragraph_blocks(clean_blocks, allow_label_break=True)
        wto_sections.append(
            {
                "heading": section["heading"],
                "blocks": clean_blocks,
                "paragraphs": blocks_to_paragraphs(clean_blocks),
            }
        )

    essays = json.loads(
        subprocess.check_output(
            ["git", "show", "main:src/data/essays/essays.extracted.json"],
            text=True,
        )
    )
    for essay in essays:
        for section in essay["sections"]:
            section["blocks"] = [
                {"type": "paragraph", "spans": [{"text": paragraph}]}
                for paragraph in section["paragraphs"]
            ]
            section["blocks"] = merge_broken_paragraph_blocks(
                section["blocks"], allow_label_break=False
            )
            section["paragraphs"] = blocks_to_paragraphs(section["blocks"])
        all_paras = [p for section in essay["sections"] for p in section["paragraphs"]]
        essay["standfirst"] = all_paras[0] if all_paras else essay.get("standfirst", "")
        essay["wordCount"] = sum(len(p.split()) for p in all_paras)

    where_to_begin = {
        "slug": "where-to-begin",
        "title": "Where to Begin — Using the Twelve Levers in the Right Order",
        "description": (
            "The practical sequence for the Sunya framework: the five zones, the three phases, "
            "and the safety guidance. Which lever matters for you right now, and which can wait."
        ),
        "sections": wto_sections,
    }

    essays_path = ROOT / "src/data/essays/essays.extracted.json"
    wto_path = ROOT / "src/data/essays/where-to-begin.extracted.json"
    essays_path.write_text(json.dumps(essays, indent=2, ensure_ascii=False) + "\n")
    wto_path.write_text(json.dumps(where_to_begin, indent=2, ensure_ascii=False) + "\n")

    # Quick report
    governing = wto_sections[0]
    print("Wrote", essays_path)
    print("Wrote", wto_path)
    print("sections", len(wto_sections))
    print("Governing Principle blocks:")
    for block in governing["blocks"]:
        if block["type"] == "list":
            print(f"  list[{len(block['items'])}]")
            for item in block["items"]:
                print("   -", "".join(span["text"] for span in item))
        else:
            rendered = "".join(
                f"**{span['text']}**"
                if span.get("bold")
                else (f"_{span['text']}_" if span.get("italic") else span["text"])
                for span in block["spans"]
            )
            print(f"  {block['type']}: {rendered}")


if __name__ == "__main__":
    main()
