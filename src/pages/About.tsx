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
// GALLERY DATA — 3 real studio photos
// ─────────────────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id: 1, src: '/images/1.jpg', title: 'Studio Work',    gridArea: '1 / 1 / 2 / 3' },
  { id: 2, src: '/images/2.jpg', title: 'Handmade Craft', gridArea: '1 / 3 / 2 / 4' },
  { id: 3, src: '/images/3.jpg', title: 'Creative Art',   gridArea: '1 / 4 / 3 / 5' },
  { id: 4, src: '/images/4.jpg', title: 'Our Work',       gridArea: '2 / 1 / 3 / 2' },
  { id: 5, src: '/images/5.jpg', title: 'Art Class',      gridArea: '2 / 2 / 3 / 3' },
  { id: 6, src: '/images/6.jpg', title: 'From the Studio', gridArea: '2 / 3 / 3 / 4' },
]

const GALLERY_ROTATIONS = [-2.2, 1.5, -1.2, 1.8, -1.5, 2.0]

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
    title: 'Beginner Friendly',
    body: 'Every class is designed with beginners in mind. Step-by-step guidance helps students, homemakers and art lovers build skills confidently — no prior experience needed.',
  },
  {
    icon: <Heart size={22} color="var(--color-brand-accent)" />,
    title: 'Personal Guidance',
    body: 'Small batch learning ensures every learner gets personal attention. We help you improve creativity, build confidence and develop real artistic talent at your own pace.',
  },
  {
    icon: <Calendar size={22} color="var(--color-brand-accent)" />,
    title: 'Online & Offline',
    body: 'Join live interactive online classes from the comfort of your home, or attend in person — with flexible timings, practice support and a creative, friendly environment.',
  },
]


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
          background: 'rgba(46, 27, 48, 0.82)',
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
            maxWidth: 680,
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            background: '#fff',
            position: 'relative',
            boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
          }}
        >
          <img
            src={item.src}
            alt={item.title}
            style={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }}
          />
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
              background: 'rgba(74,42,88,0.55)',
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
// GALLERY ITEM — polaroid-style collage card
// ─────────────────────────────────────────────────────────────────────────────
function GalleryItem({
  item,
  index,
  onClick,
}: {
  item: typeof GALLERY_ITEMS[0]
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const rot = GALLERY_ROTATIONS[index] ?? 0

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ rotate: hovered ? 0 : rot, scale: hovered ? 1.04 : 1, zIndex: hovered ? 10 : 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      style={{
        gridArea: item.gridArea,
        background: '#fff',
        padding: '7px 7px 28px',
        boxShadow: hovered
          ? '0 16px 40px rgba(74,42,88,0.22)'
          : '0 4px 18px rgba(74,42,88,0.13)',
        borderRadius: 2,
        cursor: 'zoom-in',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
        <img
          src={item.src}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        {/* Hover tint */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(201,160,192,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={24} color="#fff" fill="rgba(255,255,255,0.85)" />
        </motion.div>
      </div>
      {/* Polaroid caption */}
      <p
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '0.72rem',
          color: 'var(--color-brand-muted)',
          letterSpacing: '0.05em',
          margin: 0,
        }}
      >
        {item.title}
      </p>
    </motion.div>
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
              boxShadow: '0 2px 12px rgba(74,42,88,0.07)',
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
              boxShadow: '0 2px 12px rgba(74,42,88,0.07)',
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
          boxShadow: '0 24px 60px rgba(74,42,88,0.2)',
          border: '3px solid rgba(201,160,192,0.45)',
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
              <stop offset="0%" stopColor="#F2D0E8" />
              <stop offset="50%" stopColor="#C9A0C0" />
              <stop offset="100%" stopColor="#B8688A" />
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
          <ellipse cx="170" cy="150" rx="140" ry="130" fill="#E8A8CC" opacity="0.3" filter="url(#portrait-disp)" />
          <ellipse cx="100" cy="320" rx="100" ry="70" fill="#C9A0C0" opacity="0.2" />
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
          <span style={eyebrowStyle}>About Inbaa Arts Academy</span>
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
            Who We Are
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
            Inbaa Arts Academy is a creative learning academy dedicated to teaching beautiful
            handmade art and craft skills in a simple and practical way. We help students,
            homemakers, beginners, and art lovers learn professional creative skills through
            step-by-step guidance and friendly teaching methods.
            {' '}Our classes focus on creativity, skill development, confidence building,
            and practical learning for personal growth as well as small business opportunities.
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
              { val: '5', label: 'Courses Offered' },
              { val: '50+', label: 'Students Taught' },
              { val: 'Both', label: 'Online & Offline' },
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
// MEET THE TEACHER
// ─────────────────────────────────────────────────────────────────────────────
function TeacherSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: '5rem 24px', background: 'var(--color-brand-light)' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* Left — teacher portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'relative' }}>
            {/* Decorative ring */}
            <div
              style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '38% 62% 52% 48% / 50% 44% 56% 50%',
                border: '1.5px solid rgba(201,160,192,0.35)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: 300,
                height: 340,
                borderRadius: '38% 62% 52% 48% / 50% 44% 56% 50%',
                overflow: 'hidden',
                boxShadow: '0 20px 55px rgba(74,42,88,0.18)',
                border: '3px solid rgba(201,160,192,0.4)',
              }}
            >
              <svg
                width="300" height="340"
                viewBox="0 0 300 340"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                <defs>
                  <radialGradient id="teacher-grad" cx="45%" cy="38%" r="65%">
                    <stop offset="0%" stopColor="#F2D0E8" />
                    <stop offset="50%" stopColor="#C9A0C0" />
                    <stop offset="100%" stopColor="#B8688A" />
                  </radialGradient>
                  <filter id="teacher-disp">
                    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" />
                    <feDisplacementMap in="SourceGraphic" scale="18" />
                  </filter>
                </defs>
                <rect width="300" height="340" fill="url(#teacher-grad)" />
                <ellipse cx="150" cy="130" rx="130" ry="118" fill="#E8A8CC" opacity="0.28" filter="url(#teacher-disp)" />
                <ellipse cx="80" cy="290" rx="90" ry="60" fill="#C9A0C0" opacity="0.2" />
                <text
                  x="50%" y="52%"
                  textAnchor="middle" dominantBaseline="middle"
                  fill="rgba(250,246,241,0.2)" fontSize="10"
                  fontFamily="DM Sans, sans-serif" letterSpacing="0.15em"
                >
                  PHOTO
                </text>
              </svg>
            </div>

            {/* Experience badge */}
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: -20,
                background: 'var(--color-brand-dark)',
                borderRadius: 8,
                padding: '0.7rem 1rem',
                boxShadow: '0 8px 24px rgba(74,42,88,0.25)',
                textAlign: 'center',
                minWidth: 90,
              }}
            >
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  color: 'var(--color-brand-primary)',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                4+
              </p>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.68rem',
                  color: 'rgba(253,244,250,0.7)',
                  letterSpacing: '0.07em',
                  marginTop: '0.2rem',
                }}
              >
                Years Teaching
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — bio text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span style={eyebrowStyle}>Meet Your Teacher</span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            Kamali
          </h2>

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '1rem',
              color: 'var(--color-brand-ink)',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
              maxWidth: 500,
            }}
          >
            Kamali is the founder and lead instructor of Inbaa Arts Academy, with over 4 years
            of dedicated teaching experience in handmade arts and crafts. Her passion is making
            traditional and creative art skills accessible to everyone — from homemakers to
            students to art lovers across India.
          </p>

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '1rem',
              color: 'var(--color-brand-muted)',
              lineHeight: 1.8,
              marginBottom: '2rem',
              maxWidth: 500,
            }}
          >
            Known for her patient, step-by-step teaching style, Kamali works with small
            batches to ensure every student receives personal attention. Whether you join
            online or in person, her warm and encouraging approach helps learners build
            real skills and lasting confidence in their creative journey.
          </p>

          {/* Specialisations */}
          <div style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-muted)',
                marginBottom: '0.75rem',
                fontWeight: 500,
              }}
            >
              Specialises in
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                'Aari Embroidery',
                'Fabric Painting',
                'Silk Thread Jewellery',
                'Mehndi',
                'Artificial Flowers',
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--color-brand-accent)',
                    background: 'rgba(184,104,138,0.09)',
                    border: '1px solid rgba(184,104,138,0.22)',
                    borderRadius: 20,
                    padding: '4px 12px',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              'Small batch classes — personal attention for every student',
              'Online & offline options with flexible timings',
              'Beginner-friendly, step-by-step guidance',
            ].map((point) => (
              <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-brand-primary)',
                    flexShrink: 0,
                    marginTop: 7,
                  }}
                />
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.9rem',
                    color: 'var(--color-brand-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {point}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
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
          <span style={eyebrowStyle}>OUR APPROACH</span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
            }}
          >
            Why Choose Us
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
                boxShadow: '0 2px 12px rgba(74,42,88,0.07)',
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

        {/* Asymmetric collage grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '220px 200px',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(201,160,192,0.08)',
            borderRadius: 12,
            border: '1px solid rgba(201,160,192,0.2)',
          }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
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
          Ready to start creating?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '1rem',
            color: 'rgba(253,244,250,0.65)',
            marginBottom: '2.5rem',
          }}
        >
          Explore our courses and start learning handmade art skills today.
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
            Explore Courses
          </Link>
          <Link
            to="/courses"
            style={{
              padding: '0.8rem 2rem',
              background: 'transparent',
              border: '1px solid rgba(253,244,250,0.4)',
              borderRadius: 3,
              textDecoration: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: 'var(--color-brand-light)',
              letterSpacing: '0.03em',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(253,244,250,0.75)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(253,244,250,0.4)' }}
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
      <TeacherSection />
      <Philosophy />
      <Timeline />
      <Gallery />
      <FinalCTA />
    </div>
  )
}
