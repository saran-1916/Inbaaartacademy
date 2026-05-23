import { type ReactNode, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import ArtAmbience from './components/ArtAmbience'
import RouteLoader from './components/RouteLoader'
import Login from './pages/Login'
import StudentDashboard from './pages/dashboard/StudentDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import Workshops from './pages/Workshops'
import About from './pages/About'
import ContactPage from './pages/ContactPage'

// ── Page transition wrapper ───────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}
const pageTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }

function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ── Full site layout (Navbar + Footer + ambience) ─────────────────────────────
function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ArtAmbience />
      <Navbar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
      <FloatingCTA />
    </div>
  )
}

// ── Dashboard layout (Navbar only — dashboards provide their own sidebar) ─────
function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ArtAmbience />
      <Navbar />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <FloatingCTA />
    </div>
  )
}

// ── Placeholder page ──────────────────────────────────────────────────────────
function PlaceholderPage({ title }: { title: string }) {
  return (
    <section
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 24px',
        gap: '1rem',
      }}
    >
      <h1
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 300,
          color: 'var(--color-brand-dark)',
          letterSpacing: '0.04em',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '1rem',
          color: 'var(--color-brand-muted)',
          maxWidth: 480,
          lineHeight: 1.7,
        }}
      >
        This page is coming soon.
      </p>
    </section>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{!loaded && <PageLoader key="loader" />}</AnimatePresence>
      <RouteLoader />
      <Routes>
      {/* Login — full-screen, no global layout */}
      <Route path="/login" element={<Login />} />

      {/* Dashboards — Navbar + ambience only, no footer */}
      <Route
        path="/dashboard/student"
        element={
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        }
      />

      {/* All public pages — full site layout */}
      <Route
        path="/*"
        element={
          <SiteLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Routes>
          </SiteLayout>
        }
      />
    </Routes>
    </>
  )
}
