import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Play,
  Award,
  Settings,
  ArrowRight,
  CheckCircle,
  Clock,
  Download,
} from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────
interface Course {
  id: number
  title: string
  medium: string
  progress: number
  totalLessons: number
  completedLessons: number
  status: 'In Progress' | 'Completed' | 'Not Started'
  colors: [string, string]
}

// ── Placeholder data ──────────────────────────────────────────────────────────
const COURSES: Course[] = [
  {
    id: 1,
    title: 'Watercolour Foundations',
    medium: 'Watercolour',
    progress: 62,
    totalLessons: 20,
    completedLessons: 12,
    status: 'In Progress',
    colors: ['#E8C9A0', '#C4A882'],
  },
  {
    id: 2,
    title: 'Acrylics for Beginners',
    medium: 'Acrylics',
    progress: 100,
    totalLessons: 16,
    completedLessons: 16,
    status: 'Completed',
    colors: ['#D4956A', '#8B5E3C'],
  },
  {
    id: 3,
    title: 'Sketching Essentials',
    medium: 'Sketching',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    status: 'Not Started',
    colors: ['#A89080', '#3D2B1F'],
  },
]

const COMPLETED_LESSONS = [
  { id: 1, lesson: 'Lesson 1: Colour Theory Basics', course: 'Watercolour Foundations', date: '18 May 2025' },
  { id: 2, lesson: 'Lesson 2: Brush Handling', course: 'Watercolour Foundations', date: '19 May 2025' },
  { id: 3, lesson: 'Lesson 3: Wet-on-Dry', course: 'Watercolour Foundations', date: '20 May 2025' },
  { id: 4, lesson: 'Lesson 1: Priming & Gessoing', course: 'Acrylics for Beginners', date: '21 May 2025' },
  { id: 5, lesson: 'Lesson 2: Opacity & Transparency', course: 'Acrylics for Beginners', date: '22 May 2025' },
]

const STUDENT_NAME = 'Ananya'

const NAV_LINKS = [
  { icon: <BookOpen size={18} />, label: 'My Courses', id: 'courses' },
  { icon: <Play size={18} />, label: 'Continue Watching', id: 'watching' },
  { icon: <Award size={18} />, label: 'Certificates', id: 'certificates' },
  { icon: <Settings size={18} />, label: 'Settings', id: 'settings' },
]

// ── Sub-components ────────────────────────────────────────────────────────────
function CourseThumbnail({ colors, size = 'sm' }: { colors: [string, string]; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? { w: '100%', h: 180 } : { w: '100%', h: 100 }
  return (
    <div
      style={{
        width: dims.w,
        height: dims.h,
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id={`grain-thumb-${colors[0].slice(1)}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <ellipse cx="60" cy="40" rx="80" ry="55" fill={colors[0]} opacity="0.4" />
        <ellipse cx="150" cy="70" rx="60" ry="45" fill={colors[1]} opacity="0.35" />
        <rect width="200" height="100" filter={`url(#grain-thumb-${colors[0].slice(1)})`} opacity="0.06" />
      </svg>
    </div>
  )
}

function ProgressBar({ value, color = 'var(--color-brand-primary)' }: { value: number; color?: string }) {
  return (
    <div style={{ width: '100%', height: 5, background: 'var(--color-brand-secondary)', borderRadius: 10 }}>
      <div
        style={{
          width: `${value}%`,
          height: '100%',
          background: color,
          borderRadius: 10,
          transition: 'width 0.6s ease',
        }}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: Course['status'] }) {
  const map = {
    'In Progress': { bg: '#FEF3C7', color: '#92400E', text: 'In Progress' },
    'Completed': { bg: '#D1FAE5', color: '#065F46', text: 'Completed' },
    'Not Started': { bg: 'var(--color-brand-secondary)', color: 'var(--color-brand-muted)', text: 'Not Started' },
  }
  const s = map[status]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 20,
        background: s.bg,
        color: s.color,
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.03em',
      }}
    >
      {s.text}
    </span>
  )
}

function BrushDivider() {
  return (
    <svg viewBox="0 0 300 12" fill="none" style={{ width: 120, height: 12, display: 'block', margin: '0.25rem 0 1.25rem' }}>
      <path
        d="M2 7 Q30 3 60 7 Q90 11 120 6 Q150 2 180 7 Q210 11 240 6 Q268 2 298 6"
        stroke="var(--color-brand-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}

// ── Certificate card ──────────────────────────────────────────────────────────
function CertificateCard() {
  return (
    <div
      style={{
        border: '1.5px solid var(--color-brand-primary)',
        borderRadius: 8,
        padding: '2rem',
        background: 'linear-gradient(135deg, var(--color-brand-light) 0%, var(--color-brand-secondary) 100%)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 480,
      }}
    >
      {/* Decorative corner lines */}
      {[
        { top: 8, left: 8, rotate: '0deg' },
        { top: 8, right: 8, rotate: '90deg' },
        { bottom: 8, right: 8, rotate: '180deg' },
        { bottom: 8, left: 8, rotate: '270deg' },
      ].map((pos, i) => (
        <svg
          key={i}
          width="20" height="20"
          viewBox="0 0 20 20"
          style={{ position: 'absolute', ...pos as React.CSSProperties }}
        >
          <path d="M2 18 L2 2 L18 2" stroke="var(--color-brand-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      ))}

      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <Award size={32} color="var(--color-brand-accent)" />
        </div>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-muted)',
            marginBottom: '0.5rem',
          }}
        >
          Certificate of Completion
        </p>
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.4rem',
            fontWeight: 600,
            color: 'var(--color-brand-dark)',
            letterSpacing: '0.02em',
            marginBottom: '0.25rem',
          }}
        >
          {STUDENT_NAME}
        </h3>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.85rem',
            color: 'var(--color-brand-muted)',
            marginBottom: '0.25rem',
          }}
        >
          has successfully completed
        </p>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'var(--color-brand-accent)',
            marginBottom: '0.5rem',
            fontStyle: 'italic',
          }}
        >
          Acrylics for Beginners
        </p>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.78rem',
            color: 'var(--color-brand-muted)',
            marginBottom: '1.5rem',
          }}
        >
          Awarded on 22 May 2025 · Inbaa Academy
        </p>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.5rem',
            background: 'var(--color-brand-dark)',
            border: 'none',
            borderRadius: 3,
            cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '0.85rem',
            color: '#fff',
            letterSpacing: '0.03em',
          }}
        >
          <Download size={14} />
          Download Certificate
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('courses')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-brand-light)' }}>

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: '#fff',
          borderRight: '1px solid var(--color-brand-secondary)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 0',
          position: 'sticky',
          top: 68,
          height: 'calc(100vh - 68px)',
          overflowY: 'auto',
        }}
      >
        {/* Student avatar + info */}
        <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid var(--color-brand-secondary)' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'var(--color-brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.4rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              marginBottom: '0.75rem',
            }}
          >
            {STUDENT_NAME[0]}
          </div>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              marginBottom: '0.15rem',
            }}
          >
            Hello, {STUDENT_NAME}
          </p>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.78rem',
              color: 'var(--color-brand-muted)',
              letterSpacing: '0.04em',
            }}
          >
            Enrolled Student
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.7rem 1.25rem',
                background: activeNav === item.id ? 'var(--color-brand-secondary)' : 'none',
                border: 'none',
                borderLeft: `3px solid ${activeNav === item.id ? 'var(--color-brand-primary)' : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: activeNav === item.id ? 500 : 400,
                fontSize: '0.9rem',
                color: activeNav === item.id ? 'var(--color-brand-dark)' : 'var(--color-brand-muted)',
                textAlign: 'left',
                transition: 'all 0.18s ease',
              }}
            >
              <span style={{ opacity: activeNav === item.id ? 1 : 0.65 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Back to Academy */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--color-brand-secondary)' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.82rem',
              color: 'var(--color-brand-muted)',
              textDecoration: 'none',
              transition: 'color 0.18s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-muted)' }}
          >
            ← Back to Academy
          </Link>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', minWidth: 0 }}>

        {/* Demo banner */}
        <div
          style={{
            background: '#FEF3C7',
            border: '1px solid #F59E0B',
            borderRadius: 6,
            padding: '0.65rem 1rem',
            marginBottom: '2rem',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.82rem',
            color: '#92400E',
          }}
        >
          🎨 You're previewing the Student Dashboard in demo mode. Real data will appear after enrollment.
        </div>

        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              marginBottom: 0,
            }}
          >
            Video Sessions
          </h2>
          <BrushDivider />
          {[
            {
              label: 'Session 1',
              title: 'Featured video lesson',
              src: 'https://player.mediadelivery.net/embed/681149/9acc723c-b820-4a27-9573-ebc7709722d4?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
              allow: 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen',
            },
            {
              label: 'Session 2',
              title: 'Henna class day 01',
              src: 'https://player.vimeo.com/video/1200159133?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
              allow: 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share',
            },
            {
              label: 'Session 3',
              title: 'Introduction to Basic Henna Elements',
              src: 'https://player.vimeo.com/video/1200156253?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
              allow: 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share',
            },
          ].map((session) => (
            <div key={session.label} style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-brand-dark)',
                  marginBottom: '0.75rem',
                }}
              >
                {session.label}
              </h3>
              <div
                style={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  overflow: 'hidden',
                  borderRadius: 8,
                  background: 'var(--color-brand-dark)',
                  border: '1px solid var(--color-brand-secondary)',
                  boxShadow: '0 12px 30px rgba(74, 42, 88, 0.12)',
                }}
              >
                <iframe
                  src={session.src}
                  title={session.title}
                  loading="lazy"
                  allow={session.allow}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* ── Section 1: Continue Where You Left Off ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              marginBottom: 0,
            }}
          >
            Continue Where You Left Off
          </h2>
          <BrushDivider />

          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid var(--color-brand-secondary)',
              display: 'flex',
              gap: 0,
            }}
          >
            {/* Thumbnail */}
            <div style={{ width: 220, flexShrink: 0 }}>
              <CourseThumbnail colors={COURSES[0].colors} size="lg" />
            </div>

            {/* Info */}
            <div style={{ flex: 1, padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.72rem',
                    color: 'var(--color-brand-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Watercolour Foundations
                </span>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-brand-dark)',
                    margin: '0.25rem 0 1rem',
                  }}
                >
                  Lesson 5: Wet-on-Wet Technique
                </h3>
                <div style={{ marginBottom: '0.5rem' }}>
                  <ProgressBar value={62} color="#F59E0B" />
                </div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: 'var(--color-brand-muted)', marginBottom: '0.25rem' }}>
                  62% complete · 12 of 20 lessons done
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} color="var(--color-brand-muted)" />
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: 'var(--color-brand-muted)' }}>
                    Last watched: 2 days ago
                  </span>
                </div>
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1.25rem',
                    background: 'var(--color-brand-primary)',
                    border: 'none',
                    borderRadius: 3,
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: 'var(--color-brand-dark)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-accent)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-primary)'; e.currentTarget.style.color = 'var(--color-brand-dark)' }}
                >
                  <Play size={14} />
                  Continue Lesson →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: My Enrolled Courses ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              marginBottom: 0,
            }}
          >
            My Enrolled Courses
          </h2>
          <BrushDivider />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {COURSES.map((course) => (
              <div
                key={course.id}
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid var(--color-brand-secondary)',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(61, 43, 31, 0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                <CourseThumbnail colors={course.colors} size="sm" />
                <div style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--color-brand-dark)',
                        flex: 1,
                        paddingRight: '0.5rem',
                      }}
                    >
                      {course.title}
                    </h3>
                    <StatusBadge status={course.status} />
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <ProgressBar
                      value={course.progress}
                      color={course.status === 'Completed' ? '#10B981' : 'var(--color-brand-primary)'}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.78rem',
                      color: 'var(--color-brand-muted)',
                    }}
                  >
                    {course.completedLessons}/{course.totalLessons} lessons
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Completed Lessons ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              marginBottom: 0,
            }}
          >
            Completed Lessons
          </h2>
          <BrushDivider />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {COMPLETED_LESSONS.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '0.85rem 0',
                  borderBottom: i < COMPLETED_LESSONS.length - 1 ? '1px solid var(--color-brand-secondary)' : 'none',
                }}
              >
                {/* Timeline dot */}
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <CheckCircle size={20} color="#10B981" />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      color: 'var(--color-brand-dark)',
                      marginBottom: '0.15rem',
                    }}
                  >
                    {item.lesson}
                  </p>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.78rem',
                      color: 'var(--color-brand-muted)',
                    }}
                  >
                    {item.course}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.75rem',
                    color: 'var(--color-brand-muted)',
                    flexShrink: 0,
                  }}
                >
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Certificates ── */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'var(--color-brand-dark)',
              letterSpacing: '0.02em',
              marginBottom: 0,
            }}
          >
            Certificates
          </h2>
          <BrushDivider />
          <CertificateCard />
        </section>
      </main>
    </div>
  )
}
