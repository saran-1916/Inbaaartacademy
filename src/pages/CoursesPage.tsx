import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import CourseCardSkeleton from '../components/CourseCardSkeleton'

// ─── Data ─────────────────────────────────────────────────────────────────────

type Medium = 'Aari Embroidery' | 'Fabric Painting' | 'Silk Thread Jewellery' | 'Mehndi' | 'Artificial Flowers'
type Level = 'Beginner' | 'Intermediate' | 'Advanced'
type Format = 'Recorded' | 'Live'

interface Course {
  id: number
  title: string
  description: string
  medium: Medium
  level: Level
  format: Format
  price: 'Enquire'
  lessons: number
  seed: string
  image: string
  featured?: true
}

const COURSES: Course[] = [
  {
    id: 1, title: 'Aari Embroidery Classes', medium: 'Aari Embroidery', level: 'Beginner', format: 'Recorded',
    description: 'Learn traditional and modern Aari work — from basic stitches and floral designs to bridal blouse designs with beads, stones and professional finishing techniques.',
    price: 'Enquire', lessons: 6, seed: 'aari-embroidery', image: '/images/Aari Embroidery.png', featured: true,
  },
  {
    id: 2, title: 'Fabric Painting Classes', medium: 'Fabric Painting', level: 'Beginner', format: 'Recorded',
    description: 'Create beautiful hand-painted designs on sarees and dress fabric — colour mixing, brush techniques, outline & shading with traditional and modern patterns.',
    price: 'Enquire', lessons: 6, seed: 'fabric-painting', image: '/images/Fabric Painting.png',
  },
  {
    id: 3, title: 'Silk Thread Jewellery Classes', medium: 'Silk Thread Jewellery', level: 'Beginner', format: 'Recorded',
    description: 'Make trendy handmade silk thread jewellery — bangles, earrings, jhumkas, necklaces and full bridal sets decorated with stones and beads, with professional finishing.',
    price: 'Enquire', lessons: 6, seed: 'silk-jewellery', image: '/images/Silk Thread Jewellery.png', featured: true,
  },
  {
    id: 4, title: 'Mehndi Classes', medium: 'Mehndi', level: 'Beginner', format: 'Recorded',
    description: 'Learn stylish mehndi from beginner to advanced — Arabic, bridal, floral and traditional patterns with cone handling techniques and creative design development.',
    price: 'Enquire', lessons: 5, seed: 'mehndi-art', image: '/images/Mehndi.png',
  },
  {
    id: 5, title: 'Artificial Flowers Making', medium: 'Artificial Flowers', level: 'Beginner', format: 'Recorded',
    description: 'Create beautiful handmade paper, satin ribbon and foam flowers — perfect for gifts, events, home décor and craft projects. Beginner friendly, step-by-step training.',
    price: 'Enquire', lessons: 5, seed: 'art-flowers', image: '/images/Artificial Flowers Making.png',
  },
]

// ─── Filter config ─────────────────────────────────────────────────────────────

const MEDIUMS:   string[] = ['All', 'Aari Embroidery', 'Fabric Painting', 'Silk Thread Jewellery', 'Mehndi', 'Artificial Flowers']
const LEVELS:    string[] = ['All', 'Beginner', 'Intermediate', 'Advanced']
const FORMATS:   string[] = ['All', 'Recorded', 'Live']

// ─── Format badge colours ────────────────────────────────────────────────────

const FORMAT_COLOURS: Record<Format, { bg: string; text: string }> = {
  Recorded: { bg: 'rgba(74,42,88,0.72)',     text: '#FDF4FA' },
  Live:     { bg: 'rgba(184,104,138,0.88)',  text: '#fff'    },
}

// ─── Tiny paint-drop SVG ──────────────────────────────────────────────────────

function PaintDrop() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3 C12 3 5 11 5 16 C5 19.9 8.1 22 12 22 C15.9 22 19 19.9 19 16 C19 11 12 3 12 3Z"
        fill="var(--color-brand-primary)"
        opacity="0.9"
      />
      <path d="M9 17 C9 15 10.5 13.5 12 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// ─── Clock & Play icons ───────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7L8 5z" opacity="0.75" />
    </svg>
  )
}

// ─── Chevron ──────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── Filter Accordion Group ───────────────────────────────────────────────────

function FilterGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div style={{ borderBottom: '0.5px solid rgba(201,160,192,0.2)', paddingBottom: 12 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '10px 0',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-brand-dark)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {options.map((opt) => {
                const active = selected === opt
                return (
                  <label
                    key={opt}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 13.5,
                      color: active ? 'var(--color-brand-dark)' : 'var(--color-brand-muted)',
                      fontWeight: active ? 500 : 400,
                      transition: 'color 0.15s',
                    }}
                  >
                    {/* Custom checkbox */}
                    <span
                      onClick={() => onChange(active ? 'All' : opt)}
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: 3,
                        border: `1.5px solid ${active ? 'var(--color-brand-primary)' : 'rgba(201,160,192,0.5)'}`,
                        background: active ? 'var(--color-brand-primary)' : 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.15s',
                      }}
                    >
                      {active && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="var(--color-brand-dark)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span onClick={() => onChange(active ? 'All' : opt)}>{opt}</span>
                  </label>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Chip row (mobile) ────────────────────────────────────────────────────────

function ChipRow({ label, options, selected, onChange }: { label: string; options: string[]; selected: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12, color: 'var(--color-brand-muted)', whiteSpace: 'nowrap', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}:</span>
      {options.filter(o => o !== 'All').map((opt) => {
        const active = selected === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(active ? 'All' : opt)}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 20,
              border: `0.5px solid ${active ? 'var(--color-brand-primary)' : 'rgba(201,160,192,0.4)'}`,
              background: active ? 'var(--color-brand-primary)' : 'transparent',
              color: active ? 'var(--color-brand-dark)' : 'var(--color-brand-muted)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              fontWeight: active ? 500 : 400,
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [hovered, setHovered] = useState(false)
  const fc = FORMAT_COLOURS[course.format]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.32, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 16,
        border: '0.5px solid rgba(201,160,192,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? '0 10px 36px rgba(74,42,88,0.12)' : '0 2px 10px rgba(74,42,88,0.06)',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Image area */}
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={course.image}
          alt={course.title}
          loading={course.id <= 3 ? 'eager' : 'lazy'}
          onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.45s ease, opacity 0.4s ease',
          }}
        />
        {/* Warm overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(201,160,192,0.18)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
        />

        {/* Format badge — top right */}
        <span
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 11,
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: 20,
            background: fc.bg,
            color: fc.text,
            backdropFilter: 'blur(4px)',
            letterSpacing: '0.02em',
          }}
        >
          {course.format}
        </span>

        {/* Featured ribbon */}
        {course.featured && (
          <div
            style={{
              position: 'absolute',
              top: 22,
              right: -28,
              width: 110,
              background: 'var(--color-brand-accent)',
              color: 'white',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: '4px 0',
              transform: 'rotate(35deg)',
              transformOrigin: 'center',
              pointerEvents: 'none',
            }}
          >
            Featured
          </div>
        )}

        {/* Paint drop hover icon */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 6 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            >
              <PaintDrop />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 18,
            fontWeight: 400,
            color: 'var(--color-brand-dark)',
            marginBottom: '0.35rem',
            lineHeight: 1.3,
            letterSpacing: '0.01em',
          }}
        >
          {course.title}
        </h3>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            color: 'var(--color-brand-muted)',
            lineHeight: 1.55,
            marginBottom: '0.85rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {course.description}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 12,
            color: 'var(--color-brand-muted)',
            marginBottom: '0.85rem',
            alignItems: 'center',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <PlayIcon />
            {course.lessons} lessons
          </span>
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto' }}>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'var(--color-brand-secondary)',
              color: 'var(--color-brand-accent)',
              letterSpacing: '0.03em',
            }}
          >
            Enquire for pricing
          </span>
          <Link
            to="/contact"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              fontWeight: 500,
              padding: '7px 18px',
              borderRadius: 8,
              border: '0.5px solid rgba(201,160,192,0.5)',
              color: 'var(--color-brand-dark)',
              background: 'transparent',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-brand-primary)'
              e.currentTarget.style.borderColor = 'var(--color-brand-primary)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,160,192,0.5)'
              e.currentTarget.style.color = 'var(--color-brand-dark)'
            }}
          >
            Enquire →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface Filters {
  medium: string
  level: string
  format: string
}

function Sidebar({ filters, onChange, onClear }: { filters: Filters; onChange: (k: keyof Filters, v: string) => void; onClear: () => void }) {
  const anyActive = Object.values(filters).some((v) => v !== 'All')

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        position: 'sticky',
        top: 88,
        alignSelf: 'flex-start',
        background: 'white',
        borderRadius: 16,
        border: '0.5px solid rgba(201,160,192,0.2)',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 20,
            color: 'var(--color-brand-dark)',
            fontWeight: 400,
          }}
        >
          Filters
        </span>
        {anyActive && (
          <button
            onClick={onClear}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 12,
              color: 'var(--color-brand-accent)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup label="Medium"   options={MEDIUMS}   selected={filters.medium}   onChange={(v) => onChange('medium', v)}   />
      <FilterGroup label="Level"    options={LEVELS}    selected={filters.level}    onChange={(v) => onChange('level', v)}    />
      <FilterGroup label="Format"   options={FORMATS}   selected={filters.format}   onChange={(v) => onChange('format', v)}   />
    </aside>
  )
}

// ─── CoursesPage ──────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>({ medium: 'All', level: 'All', format: 'All' })
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 900)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  // Sync responsive state
  useState(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(min-width: 900px)')
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    // cleanup registered via pattern — effect approach below handles it
  })

  const setFilter = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }))

  const clearFilters = () =>
    setFilters({ medium: 'All', level: 'All', format: 'All' })

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
      if (filters.medium   !== 'All' && c.medium   !== filters.medium)   return false
      if (filters.level    !== 'All' && c.level    !== filters.level)    return false
      if (filters.format   !== 'All' && c.format   !== filters.format)   return false
      return true
    })
  }, [search, filters])

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-brand-secondary)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative brushstroke top edge */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 28"
          fill="none"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 28, pointerEvents: 'none' }}
        >
          <path d="M0 18 Q180 4 360 16 Q540 28 720 14 Q900 2 1080 16 Q1260 28 1440 12 L1440 0 L0 0 Z" fill="var(--color-brand-light)" />
          <path d="M0 20 Q200 8 400 18 Q600 28 800 16 Q1000 4 1200 18 Q1340 26 1440 16" stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" fill="none" />
        </svg>

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: 'clamp(48px, 7vw, 80px) 24px clamp(40px, 6vw, 64px)',
            textAlign: 'center',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-accent)',
              marginBottom: '1rem',
            }}
          >
            Course Library
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(36px, 6vw, 52px)',
              fontWeight: 300,
              color: 'var(--color-brand-dark)',
              marginBottom: '0.75rem',
              letterSpacing: '0.03em',
              lineHeight: 1.15,
            }}
          >
            Explore All Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 16,
              color: 'var(--color-brand-muted)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Aari Embroidery · Fabric Painting · Silk Thread Jewellery · Mehndi · Artificial Flowers — beginner friendly, step-by-step guidance.
          </motion.p>

          {/* YouTube free classes CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <a
              href="https://www.youtube.com/channel/UCrEWvq9rL7-4Wn6OEhBdw5g"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.25rem',
                borderRadius: 20,
                background: 'rgba(255,0,0,0.07)',
                border: '0.5px solid rgba(255,0,0,0.3)',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                fontWeight: 500,
                color: '#CC0000',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,0,0,0.13)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,0,0,0.07)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#CC0000" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch Free Classes on YouTube
            </a>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-brand-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search courses…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  height: 48,
                  padding: '0 20px 0 44px',
                  borderRadius: 50,
                  border: '0.5px solid var(--color-brand-primary)',
                  background: 'white',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 15,
                  color: 'var(--color-brand-dark)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  boxShadow: '0 2px 12px rgba(74,42,88,0.07)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 24px 4rem' }}>

        {/* Mobile chip filters */}
        {!isDesktop && (
          <div
            style={{
              overflowX: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              paddingBottom: 16,
              marginBottom: 16,
              scrollbarWidth: 'none',
            }}
          >
            <div style={{ display: 'flex', gap: 16, minWidth: 'max-content' }}>
              <ChipRow label="Medium"   options={MEDIUMS}   selected={filters.medium}   onChange={(v) => setFilter('medium', v)}   />
              <ChipRow label="Level"    options={LEVELS}    selected={filters.level}    onChange={(v) => setFilter('level', v)}    />
              <ChipRow label="Format"   options={FORMATS}   selected={filters.format}   onChange={(v) => setFilter('format', v)}   />
            </div>
            {Object.values(filters).some((v) => v !== 'All') && (
              <button
                onClick={clearFilters}
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 12,
                  color: 'var(--color-brand-accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  alignSelf: 'flex-start',
                  fontWeight: 500,
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Desktop sidebar */}
          {isDesktop && (
            <Sidebar filters={filters} onChange={setFilter} onClear={clearFilters} />
          )}

          {/* Grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Results count */}
            <div
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                color: 'var(--color-brand-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Showing{' '}
              <strong style={{ color: 'var(--color-brand-dark)', fontWeight: 500 }}>
                {filtered.length}
              </strong>{' '}
              {filtered.length === 1 ? 'course' : 'courses'}
            </div>

            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: isDesktop
                  ? 'repeat(3, 1fr)'
                  : 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 24,
              }}
            >
              {isLoading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? (
                    filtered.map((course, i) => (
                      <CourseCard key={course.id} course={course} index={i} />
                    ))
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '4rem 0',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          fontSize: 28,
                          color: 'var(--color-brand-muted)',
                          fontWeight: 300,
                          marginBottom: '0.5rem',
                        }}
                      >
                        No courses found
                      </p>
                      <p
                        style={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: 14,
                          color: 'var(--color-brand-muted)',
                          opacity: 0.7,
                        }}
                      >
                        Try adjusting your filters or search term.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
