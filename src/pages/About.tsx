import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Brush, Palette, Calendar, Heart, X, ArrowRight, Feather } from 'lucide-react'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '0.72rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-brand-primary)',
  marginBottom: '0.6rem',
  fontWeight: 500,
  display: 'block',
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY DATA — 9 art placeholders with varied heights
// ─────────────────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id: 1, h: 260, colors: ['#E8C9A0', '#C4A882'] as [string,string], title: 'Golden Hour Wash' },
  { id: 2, h: 200, colors: ['#D4956A', '#8B5E3C'] as [string,string], title: 'Terracotta Study' },
  { id: 3, h: 320, colors: ['#3D2B1F', '#8B5E3C'] as [string,string], title: 'Deep Earth' },
  { id: 4, h: 180, colors: ['#C4A882', '#FAF6F1'] as [string,string], title: 'Morning Mist' },
  { id: 5, h: 280, colors: ['#F0E6D8', '#D4956A'] as [string,string], title: 'Blush & Amber' },
  { id: 6, h: 220, colors: ['#8B5E3C', '#3D2B1F'] as [string,string], title: 'Dusk Palette' },
  { id: 7, h: 300, colors: ['#E8C9A0', '#D4956A'] as [string,string], title: 'Warm Horizon' },
  { id: 8, h: 200, colors: ['#A89080', '#C4A882'] as [string,string], title: 'Soft Neutrals' },
  { id: 9, h: 240, colors: ['#C4A882', '#8B5E3C'] as [string,string], title: 'Studio Corner' },
]

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE DATA
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2022', title: 'Inbaa Academy Founded', desc: 'Started with a first batch of 5 students — painting together on weekends over video call. The name "Inbaa" means joy in Tamil.', side: 'left' as const },
  { year: '2023', title: 'First Recorded Courses', desc: 'Launched watercolour and sketching courses as structured recorded modules — so students could learn at their own pace, anywhere in India.', side: 'right' as const },
  { year: '2024', title: 'Growing Community', desc: 'Reached 50+ students across India. Introduced certificate programmes and expanded into acrylics. Students began sharing their work publicly.', side: 'left' as const },
  { year: '2025', title: 'Live Workshops Launched', desc: 'Began real-time live cohort sessions — painting together, getting instant feedback, and building a community that creates side by side.', side: 'right' as const },
]

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY CARDS
// ─────────────────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: <Brush size={22} color="var(--color-brand-accent)" />,
    title: 'Practice Over Perfection',
    body: 'Every painter\'s first fifty paintings are for learning, not the wall. I teach you to put brush to paper without fear, and trust that skill grows through doing — not waiting until you feel ready.',
  },
  {
    icon: <Palette size={22} color="var(--color-brand-accent)" />,
    title: 'Structure That Sets You Free',
    body: 'Good technique is not a cage — it\'s a language. Once you understand why wet-on-wet blooms the way it does, or how value contrast creates depth, creative choices become intuitive and fast.',
  },
  {
    icon: <Calendar size={22} color="var(--color-brand-accent)" />,
    title: 'Art as a Daily Habit',
    body: 'Thirty minutes a day, three times a week, is more powerful than an intense weekend workshop once a year. My courses are designed around real life — short lessons, sustainable rhythm.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ART PLACEHOLDER SVG
// ─────────────────────────────────────────────────────────────────────────────
function ArtPlaceholder({
  colors,
  height,
  id,
}: {
  colors: [string, string]
  height: number
  id: number
}) {
  const uid = `ap-${id}`
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 300 ${height}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id={`${uid}-g`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="0.95" />
          <stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
        </radialGradient>
        <filter id={`${uid}-f`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" />
          <feDisplacementMap in="SourceGraphic" scale="18" />
        </filter>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="300" height={height} fill={`url(#${uid}-g)`} />
      <ellipse
        cx="120" cy={height * 0.4}
        rx="130" ry={height * 0.38}
        fill={colors[0]}
        opacity="0.35"
        filter={`url(#${uid}-f)`}
      />
      <ellipse
        cx="210" cy={height * 0.72}
        rx="100" ry={height * 0.28}
        fill={colors[1]}
        opacity="0.28"
      />
      <rect width="300" height={height} filter={`url(#${uid}-grain)`} opacity="0.06" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
}: {
  item: typeof GALLERY_ITEMS[0]
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="lb-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(44, 24, 16, 0.82)',
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backdropFilter: 'blur(6px)',
        }}
      >
        <motion.div
          key="lb-card"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 620,
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            background: '#fff',
            position: 'relative',
            boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
          }}
        >
          <ArtPlaceholder colors={item.colors} height={360} id={item.id + 100} />
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--color-brand-dark)',
                margin: 0,
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.75rem',
                color: 'var(--color-brand-muted)',
                letterSpacing: '0.08em',
                margin: 0,
              }}
            >
              From the Studio
            </p>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(44,24,16,0.55)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY ITEM
// ─────────────────────────────────────────────────────────────────────────────
function GalleryItem({
  item,
  onClick,
}: {
  item: typeof GALLERY_ITEMS[0]
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 6,
        overflow: 'hidden',
        cursor: 'zoom-in',
        breakInside: 'avoid',
        marginBottom: '1rem',
        display: 'block',
      }}
    >
      <ArtPlaceholder colors={item.colors} height={item.h} id={item.id} />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(196, 168, 130, 0.38)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1 : 0.7, opacity: hovered ? 1 : 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 280 }}
        >
          <Heart
            size={28}
            color="#fff"
            fill="rgba(255,255,255,0.85)"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE NODE (scroll-animated)
// ─────────────────────────────────────────────────────────────────────────────
function TimelineNode({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = item.side === 'left'

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 72px 1fr',
        gap: '0 1rem',
        alignItems: 'start',
        marginBottom: '3rem',
      }}
    >
      {/* Left slot */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: '#fff',
              border: '1px solid var(--color-brand-secondary)',
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
              maxWidth: 320,
              boxShadow: '0 2px 12px rgba(61,43,31,0.06)',
            }}
          >
            <TimelineCard item={item} />
          </motion.div>
        )}
      </div>

      {/* Centre dot + year */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', damping: 18, stiffness: 300, delay: index * 0.12 }}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--color-brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 0 6px var(--color-brand-secondary)',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-brand-dark)',
            }}
          >
            {item.year.slice(2)}
          </span>
        </motion.div>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.72rem',
            color: 'var(--color-brand-muted)',
            letterSpacing: '0.06em',
            marginTop: '0.4rem',
            textAlign: 'center',
          }}
        >
          {item.year}
        </p>
      </div>

      {/* Right slot */}
      <div style={{ paddingTop: '0.25rem' }}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: '#fff',
              border: '1px solid var(--color-brand-secondary)',
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
              maxWidth: 320,
              boxShadow: '0 2px 12px rgba(61,43,31,0.06)',
            }}
          >
            <TimelineCard item={item} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function TimelineCard({ item }: { item: typeof TIMELINE[0] }) {
  return (
    <>
      <p
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--color-brand-dark)',
          marginBottom: '0.4rem',
          letterSpacing: '0.01em',
        }}
      >
        {item.title}
      </p>
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.85rem',
          color: 'var(--color-brand-muted)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {item.desc}
      </p>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING ART SUPPLY ICONS (hero right side)
// ─────────────────────────────────────────────────────────────────────────────
function FloatingIcons() {
  const icons = [
    {
      el: <Brush size={22} color="var(--color-brand-primary)" />,
      style: { bottom: 40, left: '8%', animDelay: '0s', animDur: '4.5s' },
    },
    {
      el: <Palette size={20} color="var(--color-brand-accent)" />,
      style: { bottom: 80, right: '6%', animDelay: '1s', animDur: '5s' },
    },
    {
      el: <Feather size={18} color="var(--color-brand-muted)" />,
      style: { top: '15%', left: '5%', animDelay: '0.5s', animDur: '4s' },
    },
  ]

  return (
    <>
      {icons.map(({ el, style: { animDelay, animDur, ...pos } }, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            ...pos,
            animation: `blob-drift-${(i % 4) + 1} ${animDur} ${animDelay} ease-in-out infinite`,
            opacity: 0.65,
          }}
        >
          {el}
        </div>
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTRAIT PLACEHOLDER
// ─────────────────────────────────────────────────────────────────────────────
function Portrait() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
      {/* Watercolour splash SVGs behind portrait */}
      {[
        { cx: '20%', cy: '25%', rx: 110, ry: 90, opacity: 0.12 },
        { cx: '75%', cy: '70%', rx: 90, ry: 70, opacity: 0.09 },
        { cx: '80%', cy: '20%', rx: 70, ry: 60, opacity: 0.08 },
        { cx: '15%', cy: '75%', rx: 80, ry: 65, opacity: 0.07 },
      ].map((s, i) => (
        <svg
          key={i}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <filter id={`splash-blur-${i}`}>
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <ellipse
            cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
            fill="var(--color-brand-primary)"
            opacity={s.opacity}
            filter={`url(#splash-blur-${i})`}
          />
        </svg>
      ))}

      {/* Organic-shape portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: 340,
          height: 380,
          borderRadius: '40% 60% 55% 45% / 45% 45% 60% 55%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(61,43,31,0.2)',
          border: '3px solid rgba(196,168,130,0.35)',
        }}
      >
        <svg
          width="340" height="380"
          viewBox="0 0 340 380"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <defs>
            <radialGradient id="portrait-grad" cx="45%" cy="40%" r="68%">
              <stop offset="0%" stopColor="#E8C9A0" />
              <stop offset="50%" stopColor="#C4A882" />
              <stop offset="100%" stopColor="#8B5E3C" />
            </radialGradient>
            <filter id="portrait-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <filter id="portrait-disp">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" />
              <feDisplacementMap in="SourceGraphic" scale="22" />
            </filter>
          </defs>
          <rect width="340" height="380" fill="url(#portrait-grad)" />
          <ellipse cx="170" cy="150" rx="140" ry="130" fill="#D4956A" opacity="0.3" filter="url(#portrait-disp)" />
          <ellipse cx="100" cy="320" rx="100" ry="70" fill="#C4A882" opacity="0.2" />
          <rect width="340" height="380" filter="url(#portrait-grain)" opacity="0.08" />
          {/* Placeholder silhouette hint */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(250,246,241,0.18)"
            fontSize="11"
            fontFamily="DM Sans, sans-serif"
            letterSpacing="0.15em"
          >
            PHOTO PLACEHOLDER
          </text>
        </svg>
      </motion.div>

      {/* Floating art supply icons */}
      <FloatingIcons />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 24px', overflow: 'hidden' }}>
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span style={eyebrowStyle}>Meet Your Instructor</span>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.8rem, 6vw, 3.8rem)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Hi, I'm Kamali.
          </h1>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '1rem',
              color: 'var(--color-brand-ink)',
              lineHeight: 1.8,
              marginBottom: '2rem',
              maxWidth: 480,
            }}
          >
            I've been painting since I was a child, chasing colours across watercolour paper
            and canvas. Three years ago, I started Inbaa Academy with a simple belief: art
            is for everyone, and the right teacher can unlock it.{' '}
            <span style={{ color: 'var(--color-brand-muted)', fontStyle: 'italic' }}>
              [Placeholder — add your personal story here]
            </span>
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { val: '50+', label: 'Students Taught' },
              { val: '3 yrs', label: 'of Inbaa Academy' },
            ].map(({ val, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--color-brand-dark)',
                    lineHeight: 1,
                    marginBottom: '0.2rem',
                  }}
                >
                  {val}
                </p>
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.8rem',
                    color: 'var(--color-brand-muted)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.75rem',
              background: 'var(--color-brand-primary)',
              border: 'none',
              borderRadius: 3,
              textDecoration: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.03em',
              transition: 'background 0.2s ease',
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
            See My Courses
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Right — portrait */}
        <Portrait />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────────────────────────────────────
function Philosophy() {
  return (
    <section style={{ padding: '5rem 24px', background: 'var(--color-brand-secondary)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={eyebrowStyle}>MY APPROACH</span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
            }}
          >
            How I Teach
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: '1.75rem',
                boxShadow: '0 2px 12px rgba(61,43,31,0.06)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Top decorative brushstroke line */}
              <svg
                viewBox="0 0 200 10"
                style={{ width: '100%', height: 10, display: 'block', marginBottom: '1.25rem' }}
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q30 2 60 6 Q90 10 120 5 Q150 1 180 6 Q190 8 198 5"
                  stroke="var(--color-brand-primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />
              </svg>

              <div style={{ marginBottom: '0.85rem' }}>{pillar.icon}</div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--color-brand-dark)',
                  letterSpacing: '0.01em',
                  marginBottom: '0.65rem',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.875rem',
                  color: 'var(--color-brand-muted)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
function Timeline() {
  return (
    <section style={{ padding: '5rem 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={eyebrowStyle}>SINCE 2022</span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
            }}
          >
            The Inbaa Story
          </h2>
        </div>

        {/* Vertical dashed line behind nodes */}
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              transform: 'translateX(-50%)',
              width: 2,
              borderLeft: '2px dashed var(--color-brand-primary)',
              opacity: 0.3,
              zIndex: 0,
            }}
          />
          {TIMELINE.map((item, i) => (
            <TimelineNode key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────
function Gallery() {
  const [lightboxItem, setLightboxItem] = useState<typeof GALLERY_ITEMS[0] | null>(null)

  return (
    <section style={{ padding: '5rem 24px', background: 'var(--color-brand-secondary)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={eyebrowStyle}>THE STUDIO</span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
            }}
          >
            From the Studio
          </h2>
        </div>

        {/* CSS masonry via columns */}
        <div
          style={{
            columns: 'repeat(auto-fill, minmax(220px, 1fr))',
            columnGap: '1rem',
          }}
        >
          {GALLERY_ITEMS.map((item) => (
            <GalleryItem
              key={item.id}
              item={item}
              onClick={() => setLightboxItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      style={{
        background: 'var(--color-brand-dark)',
        padding: 'clamp(4rem, 8vw, 5rem) 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background blobs */}
      {[
        { cx: '15%', cy: '50%', rx: 180, ry: 140, op: 0.05 },
        { cx: '85%', cy: '40%', rx: 160, ry: 120, op: 0.04 },
      ].map((b, i) => (
        <svg
          key={i}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <defs>
            <filter id={`cta-blur-${i}`}>
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="var(--color-brand-primary)" opacity={b.op} filter={`url(#cta-blur-${i})`} />
        </svg>
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 2.9rem)',
            fontWeight: 300,
            color: 'var(--color-brand-light)',
            letterSpacing: '0.02em',
            marginBottom: '0.85rem',
            lineHeight: 1.2,
          }}
        >
          Ready to pick up a brush?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '1rem',
            color: 'rgba(250,246,241,0.65)',
            marginBottom: '2.5rem',
          }}
        >
          Start with 3 free lessons. No card needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/courses"
            style={{
              padding: '0.8rem 2rem',
              background: 'var(--color-brand-light)',
              border: 'none',
              borderRadius: 3,
              textDecoration: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.03em',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Start Free
          </Link>
          <Link
            to="/courses"
            style={{
              padding: '0.8rem 2rem',
              background: 'transparent',
              border: '1px solid rgba(250,246,241,0.4)',
              borderRadius: 3,
              textDecoration: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: 'var(--color-brand-light)',
              letterSpacing: '0.03em',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(250,246,241,0.75)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(250,246,241,0.4)' }}
          >
            View All Courses
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div style={{ background: 'var(--color-brand-light)' }}>
      <Hero />
      <Philosophy />
      <Timeline />
      <Gallery />
      <FinalCTA />
    </div>
  )
}
