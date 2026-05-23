import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, Play, Plus, Minus, CheckCircle, MessageCircle, Award, Video } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const UPCOMING = [
  {
    id: 1,
    title: 'Watercolour Florals Live Cohort',
    date: new Date('2026-06-10T04:30:00Z'), // 10:00 AM IST = 04:30 UTC
    dateLabel: 'June 10, 2026',
    timeLabel: '10:00 AM IST',
    sessions: 6,
    seats: { filled: 18, total: 30 },
    price: '₹1,999',
    colors: ['#E8C9A0', '#C4A882'] as [string, string],
  },
  {
    id: 2,
    title: 'Portrait Sketching Intensive',
    date: new Date('2026-06-18T13:30:00Z'), // 7:00 PM IST = 13:30 UTC
    dateLabel: 'June 18, 2026',
    timeLabel: '7:00 PM IST',
    sessions: 4,
    seats: { filled: 11, total: 20 },
    price: '₹1,499',
    colors: ['#3D2B1F', '#8B5E3C'] as [string, string],
  },
  {
    id: 3,
    title: 'Acrylics for Beginners Live',
    date: new Date('2026-07-02T05:30:00Z'), // 11:00 AM IST = 05:30 UTC
    dateLabel: 'July 2, 2026',
    timeLabel: '11:00 AM IST',
    sessions: 5,
    seats: { filled: 7, total: 25 },
    price: '₹1,799',
    colors: ['#D4956A', '#8B5E3C'] as [string, string],
  },
]

const PAST = [
  {
    id: 1,
    title: 'Gouache Basics Cohort',
    heldOn: 'March 2025',
    colors: ['#A89080', '#3D2B1F'] as [string, string],
  },
  {
    id: 2,
    title: 'Monochrome Landscapes',
    heldOn: 'January 2025',
    colors: ['#C4A882', '#8B5E3C'] as [string, string],
  },
  {
    id: 3,
    title: 'Abstract Expressions',
    heldOn: 'November 2024',
    colors: ['#E8C9A0', '#D4956A'] as [string, string],
  },
]

const FAQ_ITEMS = [
  {
    q: 'Can I attend if I\'m a complete beginner?',
    a: 'Absolutely. Most of our live workshops are designed for beginners or students who have completed our foundational courses. Each workshop listing clearly states the recommended level, so you can choose the right fit.',
  },
  {
    q: 'What happens if I miss a live session?',
    a: 'Every session is recorded and made available as a replay within 24 hours. Replays are accessible for 6 months after the workshop ends, so you can revisit them anytime and learn at your own pace.',
  },
  {
    q: 'How is feedback given?',
    a: 'Kamali gives live feedback during sessions by reviewing work shared in the WhatsApp group. Students can share photos of their work-in-progress or completed pieces, and feedback is given personally during dedicated critique segments.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'We offer a full refund if you request it at least 48 hours before the first session. After that, we\'re unable to offer refunds — but your seat is transferable to a future cohort or to another student.',
  },
  {
    q: 'What materials do I need?',
    a: 'A detailed materials list is sent to you via WhatsApp after registration. For most workshops you\'ll need your medium\'s paints (watercolour / acrylics), brushes, and paper. Everything is beginner-friendly and links to affordable options are included.',
  },
]

const HOW_STEPS = [
  { n: '01', title: 'Register', desc: 'Pick your workshop and complete payment. You\'re instantly added to the WhatsApp group.', icon: <CheckCircle size={20} /> },
  { n: '02', title: 'Join Live', desc: 'Attend sessions via the streaming link shared in the group. Paint along in real time.', icon: <Video size={20} /> },
  { n: '03', title: 'Get Feedback', desc: 'Share your work and receive personal critique from Kamali during live sessions.', icon: <MessageCircle size={20} /> },
  { n: '04', title: 'Keep Learning', desc: 'Access replays for 6 months, download your certificate, and keep the community.', icon: <Award size={20} /> },
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    const s = Math.floor(diff / 1000)
    return {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function WorkshopThumbnail({ colors }: { colors: [string, string] }) {
  return (
    <div
      style={{
        width: '100%',
        height: 200,
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id={`wt-grain-${colors[0].slice(1)}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <radialGradient id={`wt-grad-${colors[0].slice(1)}`} cx="35%" cy="40%" r="65%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors[1]} stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="90" rx="160" ry="100" fill={`url(#wt-grad-${colors[0].slice(1)})`} />
        <ellipse cx="300" cy="140" rx="120" ry="80" fill={colors[1]} opacity="0.2" />
        <rect width="400" height="200" filter={`url(#wt-grain-${colors[0].slice(1)})`} opacity="0.05" />
      </svg>
    </div>
  )
}

function PastThumbnail({ colors }: { colors: [string, string] }) {
  return (
    <div
      style={{
        width: '100%',
        height: 160,
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '6px 6px 0 0',
      }}
    >
      <svg width="100%" height="160" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="120" cy="70" rx="140" ry="90" fill={colors[0]} opacity="0.35" />
        <ellipse cx="300" cy="110" rx="100" ry="70" fill={colors[1]} opacity="0.25" />
      </svg>
      {/* Replay overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(44, 24, 16, 0.52)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '2px solid rgba(250,246,241,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Play size={18} color="rgba(250,246,241,0.9)" fill="rgba(250,246,241,0.9)" />
        </div>
        <span
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(250,246,241,0.75)',
            fontWeight: 500,
          }}
        >
          REPLAY
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTDOWN TIMER DISPLAY
// ─────────────────────────────────────────────────────────────────────────────
function CountdownTimer({ target }: { target: Date }) {
  const { d, h, m, s } = useCountdown(target)
  const units = [
    { val: d, label: 'Days' },
    { val: h, label: 'Hrs' },
    { val: m, label: 'Min' },
    { val: s, label: 'Sec' },
  ]
  return (
    <div style={{ display: 'flex', gap: '0.4rem' }}>
      {units.map(({ val, label }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--color-brand-secondary)',
            borderRadius: 4,
            padding: '0.3rem 0.55rem',
            minWidth: 38,
          }}
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              lineHeight: 1,
            }}
          >
            {String(val).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.6rem',
              color: 'var(--color-brand-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKSHOP CARD
// ─────────────────────────────────────────────────────────────────────────────
function WorkshopCard({ w }: { w: typeof UPCOMING[0] }) {
  const pct = Math.round((w.seats.filled / w.seats.total) * 100)
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      style={{
        background: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid var(--color-brand-secondary)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 12px rgba(61,43,31,0.06)',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative' }}>
        <WorkshopThumbnail colors={w.colors} />
        {/* Live badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(6px)',
            padding: '4px 10px',
            borderRadius: 20,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#EF4444',
              display: 'inline-block',
              animation: 'pulse-dot 1.6s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#EF4444',
            }}
          >
            UPCOMING
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--color-brand-dark)',
            letterSpacing: '0.01em',
            lineHeight: 1.3,
          }}
        >
          {w.title}
        </h3>

        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.8rem',
            color: 'var(--color-brand-muted)',
            letterSpacing: '0.04em',
          }}
        >
          with <strong style={{ color: 'var(--color-brand-accent)' }}>Kamali</strong>
        </p>

        {/* Date / time / sessions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={14} color="var(--color-brand-muted)" />
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: 'var(--color-brand-ink)' }}>
              {w.dateLabel}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={14} color="var(--color-brand-muted)" />
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: 'var(--color-brand-ink)' }}>
              {w.timeLabel} · {w.sessions} sessions
            </span>
          </div>
        </div>

        {/* Seats progress */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={13} color="var(--color-brand-muted)" />
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: 'var(--color-brand-muted)' }}>
                {w.seats.filled} of {w.seats.total} seats filled
              </span>
            </div>
            <span
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: pct >= 80 ? '#EF4444' : 'var(--color-brand-accent)',
              }}
            >
              {w.seats.total - w.seats.filled} left
            </span>
          </div>
          <div style={{ height: 5, background: 'var(--color-brand-secondary)', borderRadius: 10 }}>
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                background: pct >= 80 ? '#F59E0B' : 'var(--color-brand-primary)',
                borderRadius: 10,
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        </div>

        {/* Countdown */}
        <div>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.7rem',
              color: 'var(--color-brand-muted)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            Starts in
          </p>
          <CountdownTimer target={w.date} />
        </div>

        {/* Includes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {['WhatsApp Group', 'Replay · 6 months', 'Certificate'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.68rem',
                color: 'var(--color-brand-accent)',
                background: 'rgba(139,94,60,0.08)',
                border: '1px solid rgba(139,94,60,0.18)',
                borderRadius: 20,
                padding: '2px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--color-brand-secondary)' }}>
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.4rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
            }}
          >
            {w.price}
          </span>
          <motion.button
            whileTap={{ scale: 0.96 }}
            style={{
              padding: '0.55rem 1.2rem',
              background: 'var(--color-brand-primary)',
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              transition: 'background 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-brand-accent)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-brand-primary)'
              e.currentTarget.style.color = 'var(--color-brand-dark)'
            }}
          >
            Register Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
function HowItWorks() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const h = (e: MediaQueryListEvent) => setIsMobile(!e.matches)
    mql.addEventListener('change', h)
    return () => mql.removeEventListener('change', h)
  }, [])

  return (
    <section style={{ padding: '5rem 0', background: 'var(--color-brand-secondary)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={eyebrowStyle}>THE PROCESS</p>
          <h2 style={sectionHeadingStyle}>How Live Workshops Work</h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-start',
            gap: isMobile ? '0' : '0',
            position: 'relative',
          }}
        >
          {HOW_STEPS.map((step, i) => (
            <div
              key={step.n}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: isMobile ? 'flex-start' : 'center',
                textAlign: isMobile ? 'left' : 'center',
                position: 'relative',
                paddingBottom: isMobile && i < HOW_STEPS.length - 1 ? '2.5rem' : '0',
              }}
            >
              {/* Connector line */}
              {i < HOW_STEPS.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    ...(isMobile
                      ? { left: 24, top: 52, width: 2, height: 'calc(100% - 52px)', borderLeft: '2px dashed var(--color-brand-primary)', opacity: 0.4 }
                      : { top: 24, left: '60%', right: '-10%', height: 2, borderTop: '2px dashed var(--color-brand-primary)', opacity: 0.4 }),
                    zIndex: 0,
                  }}
                />
              )}

              {/* Number circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--color-brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  marginBottom: isMobile ? 0 : '1.25rem',
                  marginRight: isMobile ? '1.25rem' : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--color-brand-dark)',
                  }}
                >
                  {step.n}
                </span>
              </div>

              {/* Text */}
              <div style={{ paddingRight: isMobile ? 0 : '1rem', paddingLeft: isMobile ? 0 : '1rem' }}>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: 'var(--color-brand-dark)',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.85rem',
                    color: 'var(--color-brand-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-brand-secondary)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.2rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: '1rem',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: isOpen ? 600 : 400,
            color: isOpen ? 'var(--color-brand-dark)' : 'var(--color-brand-ink)',
            lineHeight: 1.4,
            letterSpacing: '0.01em',
            transition: 'color 0.2s',
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0, color: 'var(--color-brand-primary)' }}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.9rem',
                color: 'var(--color-brand-muted)',
                lineHeight: 1.75,
                paddingBottom: '1.2rem',
                paddingRight: '2.5rem',
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.72rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--color-brand-primary)',
  marginBottom: '0.6rem',
  fontWeight: 500,
}
const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
  fontWeight: 300,
  color: 'var(--color-brand-dark)',
  letterSpacing: '0.02em',
  margin: 0,
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(5rem, 12vw, 8rem) 24px clamp(4rem, 10vw, 6rem)',
        textAlign: 'center',
        background: 'var(--color-brand-dark)',
      }}
    >
      {/* Animated blob background */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        {[
          { cx: '10%', cy: '20%', rx: 260, ry: 180, color: '#C4A882', op: 0.07, anim: 'blob-drift-1', dur: '28s', delay: '0s' },
          { cx: '85%', cy: '15%', rx: 200, ry: 150, color: '#E8C9A0', op: 0.05, anim: 'blob-drift-2', dur: '34s', delay: '-6s' },
          { cx: '60%', cy: '75%', rx: 240, ry: 160, color: '#D4956A', op: 0.06, anim: 'blob-drift-3', dur: '24s', delay: '-12s' },
          { cx: '20%', cy: '80%', rx: 180, ry: 130, color: '#C4A882', op: 0.04, anim: 'blob-drift-4', dur: '30s', delay: '-4s' },
        ].map((b, i) => (
          <svg key={i} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <filter id={`hero-blur-${i}`}>
                <feGaussianBlur stdDeviation="30" />
              </filter>
            </defs>
            <ellipse
              cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
              fill={b.color} opacity={b.op}
              filter={`url(#hero-blur-${i})`}
              style={{
                transformOrigin: `${b.cx} ${b.cy}`,
                animation: `${b.anim} ${b.dur} ${b.delay} ease-in-out infinite`,
              }}
            />
          </svg>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-primary)',
            marginBottom: '1rem',
            fontWeight: 500,
          }}
        >
          LIVE WITH KAMALI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
            fontWeight: 300,
            color: 'var(--color-brand-light)',
            letterSpacing: '0.02em',
            marginBottom: '1.25rem',
            lineHeight: 1.15,
          }}
        >
          Join Live. Paint Together.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'rgba(250,246,241,0.7)',
            maxWidth: 540,
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          Fixed schedules, real-time feedback, replays included,
          and a community that paints alongside you.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2rem',
            background: 'rgba(250,246,241,0.07)',
            border: '1px solid rgba(196,168,130,0.2)',
            borderRadius: 8,
            padding: '0.9rem 2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { val: '3–4', label: 'Live sessions every month' },
            { val: '6 mo', label: 'Replays access' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-brand-primary)',
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(250,246,241,0.55)',
                  marginTop: '0.2rem',
                  letterSpacing: '0.03em',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: 'linear-gradient(to bottom, transparent, var(--color-brand-light))',
          zIndex: 2,
        }}
      />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Workshops() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--color-brand-light)' }}>
      {/* Pulsing dot keyframe injected inline */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>

      {/* ── Hero ── */}
      <Hero />

      {/* ── Upcoming Workshops ── */}
      <section style={{ padding: '5rem 24px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={eyebrowStyle}>REGISTER NOW</p>
            <h2 style={sectionHeadingStyle}>Upcoming Sessions</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {UPCOMING.map((w) => (
              <WorkshopCard key={w.id} w={w} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <HowItWorks />

      {/* ── Past workshops / Replays ── */}
      <section style={{ padding: '5rem 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={eyebrowStyle}>AVAILABLE NOW</p>
            <h2 style={sectionHeadingStyle}>Watch Past Sessions</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {PAST.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid var(--color-brand-secondary)',
                  boxShadow: '0 2px 8px rgba(61,43,31,0.05)',
                }}
              >
                <PastThumbnail colors={p.colors} />
                <div style={{ padding: '1rem 1.25rem' }}>
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--color-brand-dark)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.78rem',
                      color: 'var(--color-brand-muted)',
                      marginBottom: '0.85rem',
                    }}
                  >
                    Held {p.heldOn}
                  </p>
                  <a
                    href="#"
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--color-brand-accent)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'gap 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.gap = '0.55rem' }}
                    onMouseLeave={(e) => { e.currentTarget.style.gap = '0.3rem' }}
                  >
                    Watch Replay →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: '5rem 24px 6rem',
          background: 'var(--color-brand-secondary)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={eyebrowStyle}>GOT QUESTIONS?</p>
            <h2 style={sectionHeadingStyle}>Frequently Asked</h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
