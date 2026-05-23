import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Star } from 'lucide-react'

// ── WhatsApp SVG ──────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── Paint palette trigger icon ────────────────────────────────────────────────
function PaletteIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5"  r="0.5" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="8.5"  cy="7.5"  r="0.5" fill="currentColor" stroke="none" />
      <circle cx="6.5"  cy="12.5" r="0.5" fill="currentColor" stroke="none" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

// ── Action definitions (order = bottom → top, index 0 is closest to trigger) ─
const ACTIONS = [
  {
    label: 'Call Us',
    href: 'tel:+91XXXXXXXXXX',
    bg: '#4CAF50',
    icon: <Phone size={20} color="#fff" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/91XXXXXXXXXX',
    bg: '#25D366',
    icon: <WhatsAppIcon size={20} />,
  },
  {
    label: 'Message',
    href: 'sms:+91XXXXXXXXXX',
    bg: '#2196F3',
    icon: <MessageCircle size={20} color="#fff" />,
  },
  {
    label: 'Enroll Now',
    href: '/courses',
    bg: 'var(--color-brand-accent)',
    icon: <Star size={20} color="#fff" fill="#fff" />,
  },
]

// ── Responsive sizes ──────────────────────────────────────────────────────────
function useSizes() {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 480
  return {
    trigger: mobile ? 50 : 56,
    action: mobile ? 42 : 48,
    fontSize: mobile ? 12 : 13,
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function FloatingCTA() {
  const [open, setOpen] = useState(false)
  const sizes = useSizes()

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fcta-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.18)',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Stack container ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {/* ── Action buttons (vertical column above trigger) ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="fcta-actions"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                marginBottom: 12,
                alignItems: 'flex-end',
              }}
            >
              {/* Render in reverse so Enroll is topmost visually */}
              {[...ACTIONS].reverse().map((action, revIdx) => {
                // stagger from bottom (Call = index 0 in ACTIONS = last reversed)
                const staggerIdx = ACTIONS.length - 1 - revIdx
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 16, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 28,
                      delay: staggerIdx * 0.07,
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    {/* Label pill */}
                    <span
                      style={{
                        background: 'rgba(30,20,10,0.82)',
                        color: '#fff',
                        fontSize: sizes.fontSize,
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 500,
                        padding: '6px 14px',
                        borderRadius: 50,
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        userSelect: 'none',
                      }}
                    >
                      {action.label}
                    </span>

                    {/* Icon circle */}
                    <a
                      href={action.href}
                      onClick={close}
                      aria-label={action.label}
                      style={{
                        width: sizes.action,
                        height: sizes.action,
                        borderRadius: '50%',
                        background: action.bg,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                        flexShrink: 0,
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.26)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.18)'
                      }}
                    >
                      {action.icon}
                    </a>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Trigger button ── */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.06 }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 280 }}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          aria-expanded={open}
          style={{
            width: sizes.trigger,
            height: sizes.trigger,
            borderRadius: '50%',
            background: 'var(--color-brand-primary)',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(60,35,20,0.18)',
            flexShrink: 0,
          }}
        >
          <PaletteIcon size={24} />
        </motion.button>
      </div>
    </>
  )
}
