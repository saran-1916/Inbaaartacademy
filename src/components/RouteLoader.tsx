import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'

export default function RouteLoader() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-brand-light)',
            zIndex: 9998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* ── Watercolour blobs ── */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="rl-blur-1"><feGaussianBlur stdDeviation="40" /></filter>
              <filter id="rl-blur-2"><feGaussianBlur stdDeviation="50" /></filter>
              <filter id="rl-blur-3"><feGaussianBlur stdDeviation="35" /></filter>
            </defs>
            <ellipse
              cx="30%" cy="40%"
              rx="180" ry="120"
              fill="#C9A0C0"
              opacity="0.07"
              filter="url(#rl-blur-1)"
              style={{ animation: 'pulse-blob 1.4s ease-in-out infinite' }}
            />
            <ellipse
              cx="70%" cy="60%"
              rx="220" ry="150"
              fill="#E8A8CC"
              opacity="0.05"
              filter="url(#rl-blur-2)"
              style={{ animation: 'pulse-blob 1.4s ease-in-out infinite 0.25s' }}
            />
            <ellipse
              cx="50%" cy="30%"
              rx="150" ry="100"
              fill="#B8688A"
              opacity="0.04"
              filter="url(#rl-blur-3)"
              style={{ animation: 'pulse-blob 1.4s ease-in-out infinite 0.5s' }}
            />
          </svg>

          {/* ── Centred content ── */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Logo size="md" />
            </motion.div>

            {/* Expanding brushstroke line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              style={{
                width: 48,
                height: 1.5,
                background: 'var(--color-brand-primary)',
                transformOrigin: 'left center',
                borderRadius: 2,
              }}
            />

            {/* Staggered dots */}
            <div style={{ display: 'flex', gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 14,
                    color: 'var(--color-brand-muted)',
                    lineHeight: 1,
                  }}
                >
                  .
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
