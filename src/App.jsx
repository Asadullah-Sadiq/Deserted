import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import { useLenis } from './hooks/useLenis'
import { useThemeStore } from './store/themeStore'
import { TransitionOverlay } from './components/layout/PageTransition'
import FloatingDemoButton from './components/ui/FloatingDemoButton'

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
      <TransitionOverlay />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      {location.pathname !== '/contact' && <FloatingDemoButton />}
    </div>
  )
}

export default function App() {
  const { isDark } = useThemeStore()

  return (
    <BrowserRouter>
      <ThemeWatcher />
      <ScrollToTop />
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
  )
}
