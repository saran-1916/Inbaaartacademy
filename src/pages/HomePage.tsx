import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Section Reveal Wrapper ───────────────────────────────────────────────────

function SectionReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HERO_WORDS = ['Where', 'Every', 'Stroke', 'Tells', 'a', 'Story']

function BrushstrokeUnderline() {
  return (
    <svg
      viewBox="0 0 140 12"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: -8,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '115%',
        height: 12,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <motion.path
        d="M4 8 Q20 3 40 7 Q60 11 80 5.5 Q100 1 120 7 Q132 10 136 6"
        stroke="var(--color-brand-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: 'easeInOut' }}
      />
    </svg>
  )
}

const artThumbnails = [
  { src: '/images/Aari Embroidery.png',      alt: 'Aari Embroidery',      rotate: '-4deg',  arcY: '-20px', delay: '0s',   dur: '3.6s' },
  { src: '/images/Fabric Painting.png',       alt: 'Fabric Painting',      rotate: '1.5deg', arcY: '8px',   delay: '0.8s', dur: '4.2s' },
  { src: '/images/Silk Thread Jewellery.png', alt: 'Silk Thread Jewellery', rotate: '3.5deg', arcY: '-14px', delay: '1.5s', dur: '3.9s' },
]

function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100svh',
        background: 'var(--color-brand-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 12vh, 120px) 24px clamp(60px, 8vh, 100px)',
      }}
    >
      {/* Watercolour blob background */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        <svg
          viewBox="0 0 900 700"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '130%',
            maxWidth: 1200,
            opacity: 0.07,
            animation: 'blob-drift-1 20s ease-in-out infinite',
          }}
        >
          <path
            d="M450 70 C610 50 790 145 825 305 C860 460 755 625 595 665 C435 705 245 645 155 500 C65 360 75 175 200 105 C295 55 345 88 450 70 Z"
            fill="#C9A0C0"
          />
        </svg>
        <svg
          viewBox="0 0 600 500"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: '10%',
            right: '-8%',
            width: '55%',
            maxWidth: 480,
            opacity: 0.05,
            animation: 'blob-drift-3 25s ease-in-out infinite',
          }}
        >
          <path
            d="M300 45 C440 25 580 130 570 270 C560 415 435 510 285 498 C135 486 25 380 50 235 C75 95 185 62 300 45 Z"
            fill="#B8688A"
          />
        </svg>
        <svg
          viewBox="0 0 500 400"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '-5%',
            width: '40%',
            maxWidth: 380,
            opacity: 0.04,
            animation: 'blob-drift-2 28s ease-in-out infinite',
          }}
        >
          <path
            d="M250 40 C370 20 470 110 460 230 C450 355 340 410 220 400 C100 390 20 300 30 185 C42 70 145 58 250 40 Z"
            fill="#C9A0C0"
          />
        </svg>
      </div>

      {/* Hero content */}
      <div
        style={{
          maxWidth: 900,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-accent)',
            marginBottom: '1.5rem',
            margin: '0 0 1.5rem',
          }}
        >
          Handmade Arts · Creative Learning
        </motion.p>

        {/* Heading with word-by-word animation */}
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(40px, 7vw, 68px)',
            fontWeight: 300,
            color: 'var(--color-brand-dark)',
            lineHeight: 1.18,
            marginBottom: '1.5rem',
            letterSpacing: '0.02em',
          }}
        >
          {HERO_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word === 'Stroke' ? (
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Stroke
                  <BrushstrokeUnderline />
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 18,
            color: 'var(--color-brand-muted)',
            maxWidth: 560,
            margin: '0 auto 2.5rem',
            lineHeight: 1.72,
          }}
        >
          Learn Aari embroidery, fabric painting, silk thread jewellery, mehndi & more — step-by-step guidance for beginners, homemakers and art lovers.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}
        >
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              padding: '0 28px',
              borderRadius: 20,
              background: 'var(--color-brand-primary)',
              color: 'var(--color-brand-dark)',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s, transform 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-brand-accent)'
              e.currentTarget.style.color = 'var(--color-brand-light)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-brand-primary)'
              e.currentTarget.style.color = 'var(--color-brand-dark)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Explore Courses
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              padding: '0 28px',
              borderRadius: 20,
              background: 'transparent',
              color: 'var(--color-brand-dark)',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
              border: '0.5px solid var(--color-brand-dark)',
              transition: 'background 0.2s, transform 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-brand-secondary)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Contact Us →
          </Link>
          <a
            href="https://www.youtube.com/channel/UCrEWvq9rL7-4Wn6OEhBdw5g"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              height: 48,
              padding: '0 28px',
              borderRadius: 20,
              background: 'transparent',
              color: '#FF0000',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
              border: '0.5px solid rgba(255,0,0,0.35)',
              transition: 'background 0.2s, transform 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,0,0,0.06)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Free Classes
          </a>
        </motion.div>

        {/* Floating art thumbnails in arc */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 'clamp(10px, 2.5vw, 24px)',
          }}
        >
          {artThumbnails.map((t, i) => (
            <div
              key={i}
              style={{ transform: `rotate(${t.rotate}) translateY(${t.arcY})`, flexShrink: 0 }}
            >
              <div
                style={{
                  width: 'clamp(90px, 16vw, 165px)',
                  aspectRatio: '4/3',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow:
                    '0 8px 32px rgba(74,42,88,0.14), 0 2px 8px rgba(74,42,88,0.08)',
                  animation: `bob-thumbnail ${t.dur} ease-in-out ${t.delay} infinite`,
                }}
              >
                <img
                  src={t.src}
                  alt={t.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

type Stat =
  | { kind: 'number'; value: number; suffix: string; label: string }
  | { kind: 'text'; display: string; label: string }

const STATS: Stat[] = [
  { kind: 'number', value: 50, suffix: '+', label: 'Students Taught' },
  { kind: 'number', value: 5, suffix: '', label: 'Courses Offered' },
  { kind: 'text', display: 'India', label: 'Based in' },
  { kind: 'text', display: 'Both', label: 'Online & Offline' },
]

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const start = Date.now()
          const duration = 1400
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.6 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function StatsBar() {
  return (
    <section style={{ background: 'var(--color-brand-secondary)', padding: '28px 24px' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              padding: '8px 16px',
              borderLeft: i > 0 ? '0.5px solid rgba(201,160,192,0.35)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                color: 'var(--color-brand-dark)',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              {stat.kind === 'number' ? (
                <StatCounter value={stat.value} suffix={stat.suffix} />
              ) : (
                stat.display
              )}
            </div>
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                color: 'var(--color-brand-muted)',
                marginTop: 4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Course Paths ─────────────────────────────────────────────────────────────

function BrushIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="var(--color-brand-secondary)" />
      <rect x="35.5" y="10" width="9" height="32" rx="4.5" fill="var(--color-brand-accent)" opacity="0.75" />
      <rect x="33" y="40" width="14" height="8" rx="2" fill="var(--color-brand-primary)" />
      <ellipse cx="40" cy="61" rx="7" ry="10" fill="var(--color-brand-ink)" opacity="0.45" />
      <ellipse cx="38" cy="58" rx="2" ry="4.5" fill="white" opacity="0.12" />
    </svg>
  )
}

function WaterDropIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="var(--color-brand-secondary)" />
      <path
        d="M40 14 C40 14 20 36 20 51 C20 62.6 29 70 40 70 C51 70 60 62.6 60 51 C60 36 40 14 40 14 Z"
        fill="var(--color-brand-primary)"
        opacity="0.6"
      />
      <path
        d="M28 52 C28 45 33 40 40 38"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="var(--color-brand-secondary)" />
      <path
        d="M17 40 C17 27 27.5 17 41 17 C54.5 17 63 26 63 38.5 C63 44.8 59.5 49.5 55 49.5 C51 49.5 49.5 52 49.5 54.5 C49.5 56.5 50.5 59.5 50.5 63 C38 63 17 55 17 40 Z"
        fill="var(--color-brand-primary)"
        opacity="0.5"
      />
      <circle cx="28" cy="35" r="4" fill="#C4A882" />
      <circle cx="40" cy="26" r="4" fill="#B8688A" />
      <circle cx="53" cy="35" r="4" fill="#4A2A58" opacity="0.75" />
      <circle cx="47" cy="47" r="3.5" fill="var(--color-brand-accent)" opacity="0.65" />
    </svg>
  )
}

const COURSE_PATHS = [
  {
    Icon: BrushIcon,
    name: 'Aari Embroidery',
    description:
      'Learn traditional and modern Aari work — from basic stitches to bridal blouse designs with beads, stones and professional finishing.',
    splashColor: 'rgba(184,104,138,0.08)',
  },
  {
    Icon: WaterDropIcon,
    name: 'Fabric Painting',
    description:
      'Create beautiful hand-painted designs on sarees and fabric using traditional & modern patterns with brush and shading techniques.',
    splashColor: 'rgba(201,160,192,0.1)',
  },
  {
    Icon: PaletteIcon,
    name: 'Silk Thread Jewellery',
    description:
      'Make trendy handmade silk thread bangles, earrings, jhumkas, necklaces and full bridal sets with stone and bead decoration.',
    splashColor: 'rgba(74,42,88,0.06)',
  },
]

function PathCard({ path }: { path: (typeof COURSE_PATHS)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 20,
        border: `0.5px solid rgba(201,160,192,${hovered ? 0.5 : 0.2})`,
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Watercolour splash behind icon */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: `translateX(-50%) scale(${hovered ? 1.5 : 0.7})`,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: path.splashColor,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: 'none',
        }}
      />
      <div style={{ width: 80, height: 80, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <path.Icon />
      </div>
      <h3
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 28,
          fontWeight: 400,
          color: 'var(--color-brand-dark)',
          marginBottom: '0.75rem',
          letterSpacing: '0.02em',
        }}
      >
        {path.name}
      </h3>
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 14,
          color: 'var(--color-brand-muted)',
          lineHeight: 1.72,
          marginBottom: '1.5rem',
          flexGrow: 1,
        }}
      >
        {path.description}
      </p>
      <Link
        to="/courses"
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 14,
          color: 'var(--color-brand-accent)',
          textDecoration: 'none',
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
      >
        Explore Path →
      </Link>
    </motion.div>
  )
}

function CoursePaths() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
      <SectionReveal>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(30px, 4.5vw, 42px)',
            fontWeight: 300,
            color: 'var(--color-brand-dark)',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '0.03em',
          }}
        >
          Our Creative Courses
        </h2>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {COURSE_PATHS.map((path) => (
            <PathCard key={path.name} path={path} />
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}

// ─── Free Lessons CTA ─────────────────────────────────────────────────────────

function FreeLessonsCTA() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--color-brand-light) 0%, var(--color-brand-secondary) 100%)',
        padding: 'clamp(60px, 8vw, 100px) 24px',
      }}
    >
      <SectionReveal>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          {/* Decorative brushstroke frame — top */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 36"
            fill="none"
            style={{
              position: 'absolute',
              top: -18,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90%, 560px)',
              height: 36,
              pointerEvents: 'none',
            }}
          >
            <path
              d="M30 26 Q100 8 200 18 Q300 28 400 14 Q490 4 570 20"
              stroke="var(--color-brand-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              d="M60 18 Q160 30 280 16 Q380 4 540 22"
              stroke="var(--color-brand-primary)"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>

          {/* Content */}
          <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)' }}>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-muted)',
                marginBottom: '1rem',
              }}
            >
              Online & Offline Classes
            </p>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(30px, 5vw, 48px)',
                fontWeight: 300,
                color: 'var(--color-brand-dark)',
                marginBottom: '1.25rem',
                letterSpacing: '0.03em',
                lineHeight: 1.2,
              }}
            >
              Learn from Home or In Person
            </h2>
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 16,
                color: 'var(--color-brand-muted)',
                lineHeight: 1.75,
                maxWidth: 480,
                margin: '0 auto 2rem',
              }}
            >
              Join live interactive online classes or attend in person — with flexible timings, personal attention and a creative, friendly environment.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 48,
                padding: '0 32px',
                borderRadius: 20,
                background: 'var(--color-brand-primary)',
                color: 'var(--color-brand-dark)',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-brand-accent)'
                e.currentTarget.style.color = 'var(--color-brand-light)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-brand-primary)'
                e.currentTarget.style.color = 'var(--color-brand-dark)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Enquire Now
            </Link>
          </div>

          {/* Decorative brushstroke frame — bottom */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 36"
            fill="none"
            style={{
              position: 'absolute',
              bottom: -18,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90%, 560px)',
              height: 36,
              pointerEvents: 'none',
            }}
          >
            <path
              d="M30 12 Q140 28 260 16 Q370 6 540 20"
              stroke="var(--color-brand-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              d="M60 20 Q180 8 300 20 Q420 30 560 14"
              stroke="var(--color-brand-primary)"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>
        </div>
      </SectionReveal>
    </section>
  )
}

// ─── Featured Courses ─────────────────────────────────────────────────────────

const FEATURED_COURSES = [
  { title: 'Aari Embroidery Classes', subtitle: 'Basic to Bridal', level: 'Beginner', price: 'Enquire', seed: 'aari-embroidery', image: '/images/Aari Embroidery.png' },
  { title: 'Fabric Painting Classes', subtitle: 'Saree & Dress Design', level: 'Beginner', price: 'Enquire', seed: 'fabric-painting', image: '/images/Fabric Painting.png' },
  { title: 'Silk Thread Jewellery', subtitle: 'Bangles, Earrings & Sets', level: 'Beginner', price: 'Enquire', seed: 'silk-jewellery', image: '/images/Silk Thread Jewellery.png' },
  { title: 'Mehndi Classes', subtitle: 'Arabic to Bridal', level: 'Beginner', price: 'Enquire', seed: 'mehndi-art', image: '/images/Mehndi.png' },
]

function FeaturedCard({ course }: { course: (typeof FEATURED_COURSES)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        borderRadius: 16,
        overflow: 'hidden',
        background: 'white',
        border: '0.5px solid rgba(201,160,192,0.2)',
        boxShadow: hovered
          ? '0 12px 40px rgba(74,42,88,0.13)'
          : '0 2px 12px rgba(74,42,88,0.07)',
        transition: 'box-shadow 0.3s',
        scrollSnapAlign: 'start',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(201,160,192,0.16)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div style={{ padding: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.4rem',
            gap: 8,
          }}
        >
          <h3
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 20,
              fontWeight: 400,
              color: 'var(--color-brand-dark)',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {course.title}
          </h3>
        </div>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            color: 'var(--color-brand-muted)',
            marginBottom: '1rem',
          }}
        >
          {course.subtitle}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 12,
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'var(--color-brand-secondary)',
              color: 'var(--color-brand-accent)',
            }}
          >
            Enquire for pricing
          </span>
          <Link
            to="/contact"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              color: 'var(--color-brand-accent)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Enquire →
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeaturedCourses() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0 clamp(60px, 8vw, 100px) 24px' }}>
      <SectionReveal>
        <div style={{ paddingRight: 24, maxWidth: 1100, margin: '0 auto 2rem' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.03em',
            }}
          >
            Start Here
          </h2>
        </div>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '1rem',
            paddingRight: 24,
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-brand-primary) transparent',
          }}
        >
          {FEATURED_COURSES.map((course) => (
            <FeaturedCard key={course.title} course={course} />
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { quote: "The Aari embroidery classes were so detailed and easy to follow — I made my first blouse design!", name: 'Priya', location: 'Chennai' },
  { quote: "I started with zero experience in mehndi. Now I do bridal mehndi for family and friends.", name: 'Kavitha', location: 'Bangalore' },
  { quote: 'The pace is perfect. Never overwhelming, always inspiring. The teacher gives personal attention.', name: 'Ananya', location: 'Mumbai' },
  { quote: "The silk thread jewellery class was amazing — I made a full bridal set within a month!", name: 'Sunita', location: 'Delhi' },
  { quote: "Best learning experience. The fabric painting course helped me start my own small business.", name: 'Deepa', location: 'Hyderabad' },
  { quote: "Online classes were so convenient and the live demonstrations made everything crystal clear.", name: 'Meena', location: 'Coimbatore' },
]

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        border: '0.5px solid rgba(201,160,192,0.25)',
        padding: '20px 24px',
        minWidth: 280,
        maxWidth: 320,
        flexShrink: 0,
        marginRight: 16,
      }}
    >
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 13,
          fontStyle: 'italic',
          color: 'var(--color-brand-dark)',
          lineHeight: 1.65,
          marginBottom: '0.75rem',
        }}
      >
        "{t.quote}"
      </p>
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 12,
          color: 'var(--color-brand-muted)',
        }}
      >
        — {t.name}, {t.location}
      </p>
    </div>
  )
}

function MarqueeRow({ direction = 'left', speed = 32 }: { direction?: 'left' | 'right'; speed?: number }) {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  const animName = direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right'

  return (
    <div style={{ overflow: 'hidden', width: '100%', marginBottom: '1rem' }}>
      <div
        style={{
          display: 'flex',
          animation: `${animName} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', overflow: 'hidden' }}>
      <SectionReveal>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(30px, 4.5vw, 42px)',
            fontWeight: 300,
            color: 'var(--color-brand-dark)',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '0.03em',
            padding: '0 24px',
          }}
        >
          What Learners Say
        </h2>
      </SectionReveal>
      <MarqueeRow direction="left" speed={34} />
      <MarqueeRow direction="right" speed={40} />
    </section>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CoursePaths />
      <FreeLessonsCTA />
      <FeaturedCourses />
      <Testimonials />
    </>
  )
}
