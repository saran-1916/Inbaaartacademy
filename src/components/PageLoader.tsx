import { motion } from 'framer-motion'
import Logo from './Logo'

// Five warm-toned blobs that expand from centre like a watercolour wash
const BLOBS = [
  { cx: '50%', cy: '50%', rx: '38%', ry: '32%', fill: '#C9A0C0', delay: 0    },
  { cx: '46%', cy: '54%', rx: '30%', ry: '26%', fill: '#F2D0E8', delay: 0.12 },
  { cx: '55%', cy: '44%', rx: '26%', ry: '34%', fill: '#E8A8CC', delay: 0.22 },
  { cx: '52%', cy: '58%', rx: '42%', ry: '22%', fill: '#F5E6F2', delay: 0.32 },
  { cx: '42%', cy: '46%', rx: '22%', ry: '28%', fill: '#B8688A', delay: 0.44 },
]

export default function PageLoader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'var(--color-brand-light)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Layer 1 — Watercolour blob expansion */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {BLOBS.map((b, i) => (
          <motion.ellipse
            key={i}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill={b.fill}
            fillOpacity={0.13}
            initial={{ scale: 0, transformOrigin: `${b.cx} ${b.cy}` }}
            animate={{ scale: 1, transformOrigin: `${b.cx} ${b.cy}` }}
            transition={{
              duration: 0.7,
              delay: b.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </svg>

      {/* Layer 2 — Logo + tagline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Logo size="xl" />
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 16,
            color: 'var(--color-brand-muted)',
            letterSpacing: '0.06em',
            margin: 0,
          }}
        >
          Traditional Arts · Modern Learning
        </p>
      </motion.div>

      {/* Layer 3 — Brushstroke sweep along bottom edge on exit */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1440 6"
          fill="none"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
          aria-hidden="true"
        >
          <path
            d="M0 3 Q180 0.5 360 3.5 Q540 6 720 2.5 Q900 0 1080 3.5 Q1260 6 1440 2"
            stroke="var(--color-brand-primary)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
