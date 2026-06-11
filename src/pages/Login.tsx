import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/Logo'

// ── Artwork thumbnail placeholders ──────────────────────────────────────────
const artworks = [
  {
    label: 'Aari Florals',
    colors: ['#F2D0E8', '#C9A0C0', '#B8688A'],
    delay: 0,
  },
  {
    label: 'Silk Thread Jewellery',
    colors: ['#4A2A58', '#B8688A', '#C9A0C0'],
    delay: 0.8,
  },
  {
    label: 'Fabric Painting',
    colors: ['#FDF4FA', '#F5E6F2', '#C9A0C0'],
    delay: 1.6,
  },
]

function ArtworkThumbnail({
  colors,
  label,
  delay,
  style,
}: {
  colors: string[]
  label: string
  delay: number
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute',
        width: 110,
        height: 140,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
        filter: 'blur(0.5px)',
        ...style,
      }}
      aria-label={label}
    >
      <svg width="110" height="140" viewBox="0 0 110 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`grad-${label.replace(/\s/g, '')}`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.9" />
            <stop offset="55%" stopColor={colors[1]} stopOpacity="0.7" />
            <stop offset="100%" stopColor={colors[2]} stopOpacity="0.95" />
          </radialGradient>
          <filter id={`blur-${label.replace(/\s/g, '')}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="12" />
          </filter>
        </defs>
        <rect width="110" height="140" fill={`url(#grad-${label.replace(/\s/g, '')})`} />
        <ellipse cx="55" cy="60" rx="50" ry="45" fill={colors[0]} opacity="0.35" filter={`url(#blur-${label.replace(/\s/g, '')})`} />
        <ellipse cx="30" cy="100" rx="35" ry="25" fill={colors[2]} opacity="0.25" />
        <rect x="0" y="0" width="110" height="140" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}

// ── Left art panel background blobs ─────────────────────────────────────────
function ArtPanelBlobs() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="login-blob-blur">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <ellipse cx="20%" cy="15%" rx="160" ry="120" fill="#C9A0C0" opacity="0.08" filter="url(#login-blob-blur)" />
      <ellipse cx="80%" cy="30%" rx="120" ry="100" fill="#F5E6F2" opacity="0.06" filter="url(#login-blob-blur)" />
      <ellipse cx="50%" cy="70%" rx="180" ry="130" fill="#E8A8CC" opacity="0.07" filter="url(#login-blob-blur)" />
      <ellipse cx="10%" cy="85%" rx="140" ry="100" fill="#F2D0E8" opacity="0.06" filter="url(#login-blob-blur)" />
      <ellipse cx="85%" cy="80%" rx="100" ry="80" fill="#C9A0C0" opacity="0.05" filter="url(#login-blob-blur)" />
    </svg>
  )
}

// ── Input field (underline style) ────────────────────────────────────────────
function UnderlineInput({
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `1.5px solid ${focused ? 'var(--color-brand-accent)' : 'var(--color-brand-primary)'}`,
          padding: '0.65rem 0',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.95rem',
          color: 'var(--color-brand-ink)',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

// ── Google Icon SVG ──────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.185l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

// ── Main Login component ─────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'student' | 'admin'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD || 'inbaa123'

  const handleLogin = (destination: '/dashboard/student' | '/dashboard/admin') => {
    if (password !== demoPassword) {
      setLoginError('Incorrect password. Please try again.')
      return
    }

    setLoginError('')
    navigate(destination)
  }

  const handleStudentLogin = () => handleLogin('/dashboard/student')
  const handleAdminLogin = () => handleLogin('/dashboard/admin')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"DM Sans", sans-serif' }}>

      {/* ── LEFT — Art panel ────────────────────────────────────────────────── */}
      <div
        style={{
          flex: '0 0 50%',
          background: 'var(--color-brand-dark)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2.5rem',
        }}
        className="hidden md:flex"
      >
        <ArtPanelBlobs />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 2, marginBottom: '1rem' }}>
          <Logo size="lg" inverted />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1rem',
            color: 'rgba(250, 246, 241, 0.65)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            marginBottom: '3.5rem',
          }}
        >
          Traditional Arts · Modern Learning
        </p>

        {/* Floating artwork thumbnails */}
        <div style={{ position: 'relative', width: 260, height: 200, marginBottom: '3rem', zIndex: 2 }}>
          <ArtworkThumbnail
            colors={artworks[0].colors}
            label={artworks[0].label}
            delay={artworks[0].delay}
            style={{ left: 0, top: 20, transform: 'rotate(-6deg)' }}
          />
          <ArtworkThumbnail
            colors={artworks[1].colors}
            label={artworks[1].label}
            delay={artworks[1].delay}
            style={{ left: '50%', top: 0, transform: 'translateX(-50%) rotate(2deg)', zIndex: 1 }}
          />
          <ArtworkThumbnail
            colors={artworks[2].colors}
            label={artworks[2].label}
            delay={artworks[2].delay}
            style={{ right: 0, top: 24, transform: 'rotate(5deg)' }}
          />
        </div>

        {/* Testimonial */}
        <blockquote
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: 340,
          }}
        >
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'rgba(250, 246, 241, 0.85)',
              lineHeight: 1.8,
              marginBottom: '0.75rem',
            }}
          >
            "Kamali's watercolour sessions completely changed how I see colour.
            I went from a total beginner to finishing my first full painting in six weeks."
          </p>
          <footer
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(201, 160, 192, 0.7)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            — Priya S., Watercolour Foundations
          </footer>
        </blockquote>
      </div>

      {/* ── RIGHT — Login panel ─────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          background: 'var(--color-brand-light)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 1.5rem',
          position: 'relative',
          overflowY: 'auto',
        }}
      >
        {/* Back to home */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.82rem',
            color: 'var(--color-brand-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-muted)' }}
        >
          ← Back to Home
        </Link>

        {/* Mobile-only logo */}
        <div
          style={{ marginBottom: '2rem' }}
          className="flex md:hidden"
        >
          <Logo size="md" />
        </div>

        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Tab toggle */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--color-brand-secondary)',
              marginBottom: '2.5rem',
              position: 'relative',
            }}
          >
            {(['student', 'admin'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.75rem 0',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: tab === t ? 500 : 400,
                  fontSize: '0.9rem',
                  color: tab === t ? 'var(--color-brand-dark)' : 'var(--color-brand-muted)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
              >
                {t === 'student' ? 'Student Login' : 'Admin Login'}
              </button>
            ))}
            {/* Sliding underline indicator */}
            <motion.div
              animate={{ left: tab === 'student' ? '0%' : '50%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              style={{
                position: 'absolute',
                bottom: -1,
                width: '50%',
                height: 2,
                background: 'var(--color-brand-primary)',
                borderRadius: 2,
              }}
            />
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {tab === 'student' ? (
              <motion.div
                key="student"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
              >
                <h1
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: 'var(--color-brand-dark)',
                    letterSpacing: '0.02em',
                    marginBottom: '0.4rem',
                  }}
                >
                  Welcome back, Artist
                </h1>
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    color: 'var(--color-brand-muted)',
                    marginBottom: '2rem',
                  }}
                >
                  Sign in to continue your art journey.
                </p>

                <UnderlineInput
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={setEmail}
                />
                <UnderlineInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                />

                <div style={{ textAlign: 'right', marginTop: '-0.75rem', marginBottom: '2rem' }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.8rem',
                      color: 'var(--color-brand-muted)',
                      padding: 0,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Demo banner */}
                <div
                  style={{
                    background: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: 6,
                    padding: '0.75rem 1rem',
                    marginBottom: '1.5rem',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.82rem',
                    color: '#92400E',
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Demo Mode</strong> — Click 'Sign In' to preview the student dashboard
                </div>

                <button
                  onClick={handleStudentLogin}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: 'var(--color-brand-primary)',
                    border: 'none',
                    borderRadius: 3,
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: 'var(--color-brand-dark)',
                    letterSpacing: '0.04em',
                    transition: 'background 0.2s ease',
                    marginBottom: '1.25rem',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-brand-accent)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-brand-primary)'; e.currentTarget.style.color = 'var(--color-brand-dark)' }}
                >
                  Sign In
                </button>

                {/* Or divider */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div style={{ flex: 1, height: '0.5px', background: 'var(--color-brand-secondary)' }} />
                  <span
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '0.8rem',
                      color: 'var(--color-brand-muted)',
                    }}
                  >
                    — or —
                  </span>
                  <div style={{ flex: 1, height: '0.5px', background: 'var(--color-brand-secondary)' }} />
                </div>

                {/* Google button */}
                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#fff',
                    border: '0.5px solid #d1d5db',
                    borderRadius: 3,
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    marginBottom: '2rem',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <p
                  style={{
                    textAlign: 'center',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.85rem',
                    color: 'var(--color-brand-muted)',
                  }}
                >
                  New to Inbaa?{' '}
                  <a
                    href="/courses"
                    style={{
                      color: 'var(--color-brand-accent)',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Enroll in a course →
                  </a>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <h1
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: 'var(--color-brand-dark)',
                    letterSpacing: '0.02em',
                    marginBottom: '0.4rem',
                  }}
                >
                  Admin Access
                </h1>
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    color: 'var(--color-brand-muted)',
                    marginBottom: '2rem',
                  }}
                >
                  Inbaa Academy management portal.
                </p>

                <UnderlineInput
                  type="email"
                  placeholder="Admin email"
                  value={email}
                  onChange={setEmail}
                />
                <UnderlineInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                />

                {/* Admin demo banner */}
                <div
                  style={{
                    background: '#EDE9FE',
                    border: '1px solid #7C3AED',
                    borderRadius: 6,
                    padding: '0.75rem 1rem',
                    marginBottom: '1.5rem',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.82rem',
                    color: '#4C1D95',
                    lineHeight: 1.5,
                    marginTop: '0.5rem',
                  }}
                >
                  <strong>Demo Mode</strong> — Click to preview the admin panel
                </div>

                <button
                  onClick={handleAdminLogin}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: 'var(--color-brand-dark)',
                    border: 'none',
                    borderRadius: 3,
                    cursor: 'pointer',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: '#fff',
                    letterSpacing: '0.04em',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  Sign In as Admin
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
