import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Calendar, RotateCcw, ChevronDown, ArrowRight } from "lucide-react";
import { LEVER_ICONS, type Solution } from "@/lib/parse-solution";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  solution: Solution;
  createdAt?: string;
  conversation?: Msg[];
  onNewSession?: () => void;
  /** When true, the "New Session" action becomes "Start a new session →" linking to /sunya-ai */
  isPastView?: boolean;
};

function formatDate(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildPdfHtml(s: Solution, dateStr: string) {
  const practices = s.practices
    .map(
      (p, i) => `
      <div class="practice pdf-block">
        <div class="practice-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="practice-row">
          <div class="practice-icon">${(p.lever && LEVER_ICONS[p.lever]) || "✦"}</div>
          <div class="practice-body">
            <div class="practice-name">${escapeHtml(p.name)}</div>
            <div class="practice-desc">${escapeHtml(p.description)}</div>
          </div>
        </div>
      </div>`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8" />
<title>Sunya Reading — ${dateStr}</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #06101f; }
  body { font-family: Georgia, 'Cormorant Garamond', serif; color: #e8f0fa; line-height: 1.65; width: 760px; }
  .pdf-root { padding: 0; }
  .pdf-block { margin-bottom: 14px; }
  .header-block { text-align: center; padding-bottom: 4px; }
  .wordmark { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 42px; letter-spacing: 0.5em; font-weight: 500; color: #ffffff; }
  .brand-sub { font-size: 12px; letter-spacing: 0.4em; text-transform: uppercase; color: #7ec8e3; margin-top: 12px; }
  .date { font-size: 13px; color: #b8d4e8; margin-top: 8px; font-family: 'Helvetica Neue', Arial, sans-serif; }
  .star { color: #7ec8e3; font-size: 22px; margin-top: 8px; }
  .divider { height: 1px; background: rgba(126,200,227,0.25); margin-top: 18px; }
  .label { font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #7ec8e3; margin-bottom: 14px; font-family: 'Helvetica Neue', Arial, sans-serif; }
  .mirror-wrap { background: linear-gradient(90deg, rgba(230,200,154,0.12), rgba(126,200,227,0.04), transparent); border-radius: 16px; padding: 22px 24px; }
  .mirror-label { color: #e6c89a; }
  .mirror { font-style: italic; font-size: 22px; color: #ffffff; border-left: 3px solid #e6c89a; padding-left: 18px; margin: 0; line-height: 1.55; }
  .insight { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15.5px; color: #e8f0fa; line-height: 1.8; }
  .practice { border: 1px solid rgba(126,200,227,0.18); background: rgba(255,255,255,0.03); border-radius: 16px; padding: 18px 20px; position: relative; }
  .practice-num { position: absolute; top: 14px; right: 18px; font-size: 11px; color: rgba(126,200,227,0.55); letter-spacing: 0.2em; font-family: 'Courier New', monospace; }
  .practice-row { display: flex; align-items: flex-start; gap: 14px; }
  .practice-icon { font-size: 26px; line-height: 1; flex-shrink: 0; }
  .practice-body { flex: 1; padding-right: 32px; }
  .practice-name { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 700; font-size: 16px; color: #ffffff; margin-bottom: 6px; }
  .practice-desc { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14.5px; color: #cfe1ef; line-height: 1.7; }
  .reframe-section { background: linear-gradient(180deg, rgba(14,31,58,0.5), transparent); border-radius: 16px; padding: 30px 24px; }
  .reframe-label { text-align: center; }
  .reframe { text-align: center; font-style: italic; font-size: 26px; color: #ffffff; margin: 16px auto 0; max-width: 85%; line-height: 1.5; }
  .footer-block { padding-top: 18px; border-top: 1px solid rgba(126,200,227,0.25); font-size: 11.5px; color: #b8d4e8; text-align: center; font-family: 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.04em; }
</style></head><body>
  <div class="pdf-root">
    <div class="pdf-block header-block">
      <div class="wordmark">SUNYA</div>
      <div class="brand-sub">Your Personal Reading</div>
      <div class="date">${escapeHtml(dateStr)}</div>
      <div class="star">✦</div>
      <div class="divider"></div>
    </div>

    <div class="pdf-block">
      <div class="mirror-wrap">
        <div class="label mirror-label">What Sunya Heard</div>
        <p class="mirror">${escapeHtml(s.mirror)}</p>
      </div>
    </div>

    <div class="pdf-block">
      <div class="label">The Insight</div>
      <div class="insight">${escapeHtml(s.insight).replace(/\n/g, "<br/>")}</div>
    </div>

    <div class="pdf-block">
      <div class="label">Your Practices</div>
    </div>
    ${practices}

    ${
      s.reframe
        ? `<div class="pdf-block reframe-section"><div class="label reframe-label">The Reframe</div><div class="reframe">${escapeHtml(s.reframe)}</div></div>`
        : ""
    }

    <div class="pdf-block" style="margin-top:18px">
      <div class="footer-block">
        This reading is generated by Sunya AI for personal reflection only. Not medical advice. desmondolubunmi.com.
      </div>
    </div>
  </div>
</body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function SolutionCard({
  solution,
  createdAt,
  conversation,
  onNewSession,
  isPastView,
}: Props) {
  const [showConvo, setShowConvo] = useState(false);
  const date = createdAt ? new Date(createdAt) : new Date();

  async function downloadPdf() {
    const html = buildPdfHtml(solution, formatDate(date));
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "-10000px";
    iframe.style.top = "0";
    iframe.style.width = "800px";
    iframe.style.height = "1200px";
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(html.replace(/<script[\s\S]*?<\/script>/g, ""));
    doc.close();
    await new Promise((r) => setTimeout(r, 400));
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const target = doc.body;
      const canvas = await html2canvas(target, {
        scale: 2,
        backgroundColor: "#06101f",
        useCORS: true,
      });
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
        heightLeft -= pageH;
      }
      const safeDate = date.toISOString().slice(0, 10);
      pdf.save(`sunya-reading-${safeDate}.pdf`);
    } finally {
      document.body.removeChild(iframe);
    }
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br from-[#7ec8e3]/30 via-transparent to-[#2e6db4]/30 blur-2xl" />

      <article className="glass-strong overflow-hidden rounded-3xl border border-[#7ec8e3]/30 bg-gradient-to-b from-[#0c1d36]/95 to-[#081427]/95 shadow-[0_0_80px_-20px_rgba(126,200,227,0.45)]">
        {/* Header */}
        <header className="flex items-start justify-between border-b border-white/10 px-7 py-5">
          <div>
            <div className="label-eyebrow text-[10px] text-[#7ec8e3]">Your Sunya Reading</div>
            <div className="mt-1.5 text-[11px] text-[#b8d4e8]/60">{formatDate(date)}</div>
          </div>
          <div className="text-2xl text-[#7ec8e3]">✦</div>
        </header>

        {/* 1. Mirror */}
        <section className="border-b border-white/5 bg-gradient-to-r from-[#1a1208]/40 via-[#1a1a2e]/20 to-transparent px-7 py-7">
          <div className="label-eyebrow text-[10px] text-[#e6c89a]">What Sunya Heard</div>
          <p className="display-italic mt-4 text-xl leading-relaxed text-white/95 sm:text-[22px]">
            "{solution.mirror}"
          </p>
        </section>

        {/* 2. Insight */}
        <section className="border-b border-white/5 px-7 py-7">
          <div className="label-eyebrow text-[10px] text-[#7ec8e3]">The Insight</div>
          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-[1.8] text-white/90">
            {solution.insight}
          </p>
        </section>

        {/* 3. Practices */}
        <section className="border-b border-white/5 bg-[#06101f]/60 px-7 py-7">
          <div className="label-eyebrow text-[10px] text-[#7ec8e3]">Your Practices</div>
          <div className="mt-5 space-y-3">
            {solution.practices.map((p, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#7ec8e3]/30"
              >
                <div className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.2em] text-[#7ec8e3]/60">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-2xl leading-none">
                    {(p.lever && LEVER_ICONS[p.lever]) || "✦"}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-white">{p.name}</div>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#cfe1ef]">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {solution.practices.length === 0 && (
              <div className="text-sm text-[#b8d4e8]/60">No practices identified.</div>
            )}
          </div>
        </section>

        {/* 4. Reframe */}
        {solution.reframe && (
          <section className="bg-gradient-to-b from-[#0e1f3a]/40 to-transparent px-7 py-10">
            <div className="label-eyebrow text-center text-[10px] text-[#7ec8e3]">
              The Reframe
            </div>
            <p className="display-italic mx-auto mt-5 max-w-xl text-center text-[22px] leading-relaxed text-white sm:text-[26px]">
              {solution.reframe}
            </p>
          </section>
        )}

        {/* Footer actions */}
        <footer className="flex flex-wrap items-center justify-center gap-2 border-t border-white/10 bg-black/20 px-5 py-5 text-xs">
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[#cfe1ef] transition hover:border-[#7ec8e3]/40 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF
          </button>
          <Link
            to="/work-with-me"
            className="group relative inline-flex items-center gap-2 rounded-full border border-[#e6c89a]/50 bg-gradient-to-r from-[#e6c89a]/20 via-[#7ec8e3]/20 to-[#e6c89a]/20 px-4 py-2.5 text-white shadow-[0_0_24px_-4px_rgba(230,200,154,0.6)] transition hover:shadow-[0_0_36px_-2px_rgba(230,200,154,0.9)]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#e6c89a]/0 via-white/20 to-[#e6c89a]/0 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <Calendar className="h-3.5 w-3.5" /> Book a 1-on-1
          </Link>
          {isPastView ? (
            <Link
              to="/sunya-ai"
              className="inline-flex items-center gap-2 rounded-full border border-[#7ec8e3]/40 bg-[#7ec8e3]/10 px-4 py-2.5 text-white transition hover:bg-[#7ec8e3]/20"
            >
              Start a new session <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <button
              onClick={onNewSession}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[#cfe1ef] transition hover:border-[#7ec8e3]/40 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> New Session
            </button>
          )}
        </footer>
      </article>

      {/* Collapsed conversation pill */}
      {conversation && conversation.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowConvo((v) => !v)}
            className="mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#b8d4e8] transition hover:border-[#7ec8e3]/30 hover:text-white"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showConvo ? "rotate-180" : "-rotate-90"}`}
            />
            {showConvo
              ? "Hide conversation"
              : isPastView
                ? "View the conversation that created this reading"
                : "View conversation that generated this reading"}
          </button>

          {showConvo && (
            <div className="mt-5 space-y-3 rounded-2xl border border-white/5 bg-black/20 p-5">
              {conversation.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                      : "max-w-[92%] rounded-2xl border border-[#7ec8e3]/25 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/90"
                  }
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
