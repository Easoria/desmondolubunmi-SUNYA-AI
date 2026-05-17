export function Orbs() {
  return (
    <>
      <div
        className="orb"
        style={{
          width: 480,
          height: 480,
          left: "-8%",
          top: "10%",
          background: "radial-gradient(circle, #1b4f8a 0%, transparent 70%)",
        }}
      />
      <div
        className="orb"
        style={{
          width: 380,
          height: 380,
          right: "-6%",
          top: "30%",
          background: "radial-gradient(circle, #7ec8e3 0%, transparent 70%)",
          opacity: 0.25,
          animationDelay: "-6s",
        }}
      />
    </>
  );
}

export function SacredGeometry({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={`pointer-events-none absolute opacity-[0.07] ${className}`}
      aria-hidden
    >
      <g
        fill="none"
        stroke="#7ec8e3"
        strokeWidth="0.5"
        className="spin-slow"
        style={{ transformOrigin: "300px 300px" }}
      >
        <circle cx="300" cy="300" r="120" />
        <circle cx="300" cy="180" r="120" />
        <circle cx="300" cy="420" r="120" />
        <circle cx="404" cy="240" r="120" />
        <circle cx="404" cy="360" r="120" />
        <circle cx="196" cy="240" r="120" />
        <circle cx="196" cy="360" r="120" />
        <circle cx="300" cy="300" r="240" />
        <circle cx="300" cy="300" r="260" />
      </g>
    </svg>
  );
}
