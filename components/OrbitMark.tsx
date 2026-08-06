// Rekonstruksi geometri logo DYTECH (lingkaran konsentris / orbit)
// sebagai elemen visual berulang di seluruh situs.
export function OrbitMark({
  size = 420,
  animated = true,
}: {
  size?: number;
  animated?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6C623" />
          <stop offset="55%" stopColor="#2F5CF0" />
          <stop offset="100%" stopColor="#F0323B" />
        </linearGradient>
        <radialGradient id="core-grad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#5C82FF" />
          <stop offset="100%" stopColor="#1B3AC4" />
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className={animated ? "animate-spin-slow" : ""} style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#ring-grad)" strokeWidth="2.5" strokeDasharray="4 10" opacity="0.55" />
      </g>
      <g className={animated ? "animate-spin-slow-rev" : ""} style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="120" fill="none" stroke="#F6C623" strokeWidth="1.5" strokeDasharray="1 8" opacity="0.4" />
      </g>

      <path
        d="M180 90 A110 110 0 1 1 180 310 A150 150 0 0 0 180 90 Z"
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="3"
        filter="url(#glow)"
        opacity="0.9"
      />
      <path
        d="M175 130 A80 80 0 1 1 175 270 A105 105 0 0 0 175 130 Z"
        fill="none"
        stroke="#F6C623"
        strokeWidth="2"
        opacity="0.55"
      />

      <circle cx="168" cy="200" r="52" fill="url(#core-grad)" filter="url(#glow)" opacity="0.95" />
      <circle cx="168" cy="200" r="52" fill="none" stroke="#8AA3FF" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
