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
      <div class="practice">
        <div class="practice-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="practice-name">${escapeHtml(p.name)}</div>
        <div class="practice-desc">${escapeHtml(p.description)}</div>
      </div>`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8" />
<title>Sunya Reading — ${dateStr}</title>
<style>
  @page { size: A4; margin: 22mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, 'Cormorant Garamond', serif; color: #0a1628; background: #fff; margin: 0; padding: 0; line-height: 1.55; }
  .header { border-bottom: 1px solid #c9d6e6; padding-bottom: 16px; margin-bottom: 28px; }
  .wordmark { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; letter-spacing: 0.4em; font-weight: 500; }
  .subtitle { font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; color: #56708a; margin-top: 6px; }
  .date { font-size: 11px; color: #6a8298; margin-top: 4px; }
  .label { font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: #2e6db4; margin-bottom: 8px; }
  .section { margin-bottom: 28px; }
  .mirror { font-style: italic; font-size: 17px; color: #1c324a; border-left: 3px solid #7ec8e3; padding-left: 16px; }
  .insight { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13.5px; color: #1c324a; }
  .practice { border: 1px solid #e0e8f1; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; position: relative; page-break-inside: avoid; }
  .practice-num { position: absolute; top: 10px; right: 14px; font-size: 10px; color: #7ec8e3; letter-spacing: 0.2em; }
  .practice-name { font-family: 'Helvetica Neue', Arial, sans-serif; font-weight: 700; font-size: 14px; color: #0a1628; margin-bottom: 4px; }
  .practice-desc { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12.5px; color: #2d4862; }
  .reframe { text-align: center; font-style: italic; font-size: 19px; color: #0a1628; margin: 22px auto; max-width: 80%; }
  .footer { margin-top: 36px; padding-top: 14px; border-top: 1px solid #c9d6e6; font-size: 10px; color: #6a8298; text-align: center; }
</style></head><body>
  <div class="header">
    <div class="wordmark">SUNYA</div>
    <div class="subtitle">Your Personal Reading</div>
    <div class="date">${escapeHtml(dateStr)}</div>
  </div>

  <div class="section">
    <div class="label">What Sunya Heard</div>
    <div class="mirror">${escapeHtml(s.mirror)}</div>
  </div>

  <div class="section">
    <div class="label">The Insight</div>
    <div class="insight">${escapeHtml(s.insight).replace(/\n/g, "<br/>")}</div>
  </div>

  <div class="section">
    <div class="label">Your Practices</div>
    ${practices}
  </div>

  ${
    s.reframe
      ? `<div class="section"><div class="label" style="text-align:center">The Reframe</div><div class="reframe">${escapeHtml(s.reframe)}</div></div>`
      : ""
  }

  <div class="footer">
    sunyasleep.com · This reading is for personal wellbeing purposes only. Not medical advice.
  </div>
  <script>window.onload = () => { setTimeout(() => window.print(), 250); };</script>
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
        backgroundColor: "#ffffff",
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
