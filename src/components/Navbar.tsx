import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Live Workshops', to: '/workshops' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function BrushstrokeUnderline() {
  return (
    <svg
      viewBox="0 0 60 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: -6,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        minWidth: 40,
        maxWidth: 80,
        height: 8,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <path
        d="M2 5 Q8 2 16 4.5 Q24 7 32 4 Q40 1.5 48 4.5 Q54 6.5 58 4"
        stroke="var(--color-brand-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  )
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          background: 'rgba(250, 246, 241, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled
            ? '0.5px solid rgba(196, 168, 130, 0.3)'
            : '0.5px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Logo size="md" />
          </NavLink>

          {/* Desktop nav links */}
          {isDesktop && (
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                gap: '2rem',
                margin: 0,
                padding: 0,
                alignItems: 'center',
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  link.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.to)
                return (
                  <li key={link.to} style={{ position: 'relative' }}>
                    <NavLink
                      to={link.to}
                      style={{
                        textDecoration: 'none',
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: isActive
                          ? 'var(--color-brand-dark)'
                          : 'var(--color-brand-ink)',
                        letterSpacing: '0.01em',
                        padding: '4px 2px',
                        position: 'relative',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {link.label}
                      {isActive && <BrushstrokeUnderline />}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Desktop CTA buttons */}
          {isDesktop && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <NavLink
                to="/login"
                style={{
                  textDecoration: 'none',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: 'var(--color-brand-dark)',
                  border: '1px solid var(--color-brand-primary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2px',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-brand-secondary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/courses"
                style={{
                  textDecoration: 'none',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: 'var(--color-brand-dark)',
                  background: 'var(--color-brand-primary)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2px',
                  border: '1px solid transparent',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-brand-accent)'
                  e.currentTarget.style.color = 'var(--color-brand-light)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-brand-primary)'
                  e.currentTarget.style.color = 'var(--color-brand-dark)'
                }}
              >
                Enroll Now
              </NavLink>
            </div>
          )}

          {/* Mobile hamburger */}
          {!isDesktop && (
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-brand-dark)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          )}
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(44, 24, 16, 0.35)',
                zIndex: 200,
              }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(80vw, 320px)',
                background: 'var(--color-brand-light)',
                zIndex: 201,
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Logo size="sm" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-brand-dark)',
                    padding: 4,
                    display: 'flex',
                  }}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {navLinks.map((link, i) => {
                  const isActive =
                    link.to === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(link.to)
                  return (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <NavLink
                        to={link.to}
                        style={{
                          textDecoration: 'none',
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          fontWeight: isActive ? 600 : 400,
                          fontSize: '1.5rem',
                          color: isActive ? 'var(--color-brand-accent)' : 'var(--color-brand-dark)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {link.label}
                      </NavLink>
                    </motion.li>
                  )
                })}
              </ul>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <NavLink
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: 'var(--color-brand-dark)',
                    border: '1px solid var(--color-brand-primary)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2px',
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                  }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/courses"
                  style={{
                    textDecoration: 'none',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: 'var(--color-brand-dark)',
                    background: 'var(--color-brand-primary)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2px',
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                  }}
                >
                  Enroll Now
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
