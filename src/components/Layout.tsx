import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingCTA from './FloatingCTA'
import ArtAmbience from './ArtAmbience'

interface LayoutProps {
  children: ReactNode
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Ambient art background — behind everything */}
      <ArtAmbience />

      {/* Navbar */}
      <Navbar />

      {/* Page content with transition */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
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
      </main>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>

      {/* Floating speed-dial CTA */}
      <FloatingCTA />
    </div>
  )
}
