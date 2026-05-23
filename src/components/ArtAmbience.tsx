const blobs = [
  {
    cx: '12%', cy: '18%', rx: 220, ry: 160,
    color: '#C4A882', opacity: 0.055,
    animation: 'blob-drift-1', duration: '26s', delay: '0s',
  },
  {
    cx: '78%', cy: '12%', rx: 180, ry: 140,
    color: '#D4956A', opacity: 0.045,
    animation: 'blob-drift-2', duration: '32s', delay: '-8s',
  },
  {
    cx: '88%', cy: '55%', rx: 200, ry: 170,
    color: '#8B5E3C', opacity: 0.04,
    animation: 'blob-drift-3', duration: '22s', delay: '-4s',
  },
  {
    cx: '20%', cy: '72%', rx: 240, ry: 150,
    color: '#E8C9A0', opacity: 0.06,
    animation: 'blob-drift-4', duration: '28s', delay: '-12s',
  },
  {
    cx: '50%', cy: '38%', rx: 160, ry: 120,
    color: '#C4A882', opacity: 0.035,
    animation: 'blob-drift-2', duration: '18s', delay: '-6s',
  },
  {
    cx: '65%', cy: '82%', rx: 190, ry: 130,
    color: '#D4956A', opacity: 0.05,
    animation: 'blob-drift-1', duration: '30s', delay: '-14s',
  },
  {
    cx: '35%', cy: '90%', rx: 140, ry: 100,
    color: '#8B5E3C', opacity: 0.038,
    animation: 'blob-drift-3', duration: '24s', delay: '-2s',
  },
  {
    cx: '5%', cy: '48%', rx: 170, ry: 145,
    color: '#E8C9A0', opacity: 0.042,
    animation: 'blob-drift-4', duration: '20s', delay: '-10s',
  },
]

export default function ArtAmbience() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blob-blur">
            <feGaussianBlur stdDeviation="35" />
          </filter>
        </defs>
        {blobs.map((blob, i) => (
          <ellipse
            key={i}
            cx={blob.cx}
            cy={blob.cy}
            rx={blob.rx}
            ry={blob.ry}
            fill={blob.color}
            opacity={blob.opacity}
            filter="url(#blob-blur)"
            style={{
              transformOrigin: `${blob.cx} ${blob.cy}`,
              animation: `${blob.animation} ${blob.duration} ${blob.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
