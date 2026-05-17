import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import { useLenis } from './hooks/useLenis'
import { useThemeStore } from './store/themeStore'
import { useModalStore } from './store/modalStore'
import { TransitionOverlay } from './components/layout/PageTransition'
import FloatingDemoButton from './components/ui/FloatingDemoButton'
import ProjectModal from './components/modals/ProjectModal'
import CallModal from './components/modals/CallModal'
import PartnerModal from './components/modals/PartnerModal'
import PageLoader from './components/ui/PageLoader'
import CustomCursor from './components/ui/CustomCursor'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ThemeWatcher() {
  const { isDark, setDark } = useThemeStore()

  useEffect(() => {
    const stored = localStorage.getItem('digitech-theme')
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease'
  }, [isDark])

  return null
}

function AppContent() {
  const location = useLocation()
  const { isDark } = useThemeStore()
  const { activeModal, closeModal, openModal } = useModalStore()
  useLenis()

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'var(--bg)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Skip to content */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: -60,
          left: 16,
          zIndex: 99999,
          padding: '8px 16px',
          background: '#6C63FF',
          color: '#fff',
          borderRadius: 8,
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600,
          fontSize: 14,
          textDecoration: 'none',
          transition: 'top 0.2s ease',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '16px' }}
        onBlur={(e) => { e.currentTarget.style.top = '-60px' }}
      >
        Skip to main content
      </a>

      <TransitionOverlay />
      <Navbar />

      <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      {location.pathname !== '/contact' && <FloatingDemoButton />}

      {/* Global modals */}
      <ProjectModal isOpen={activeModal === 'project'} onClose={closeModal} />
      <CallModal    isOpen={activeModal === 'call'}    onClose={closeModal} />
      <PartnerModal isOpen={activeModal === 'partner'} onClose={closeModal} />
    </div>
  )
}

export default function App() {
  const { isDark } = useThemeStore()

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeWatcher />
        <ScrollToTop />
        <PageLoader />
        <CustomCursor />
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDark ? '#0a0f1e' : '#ffffff',
              color: isDark ? '#f9fafb' : '#0D0F26',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  )
}
