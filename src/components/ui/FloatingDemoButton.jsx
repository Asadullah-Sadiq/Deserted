import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarDays, X } from 'lucide-react'

export default function FloatingDemoButton() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) {
        setVisible(window.scrollY > 540)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  const handleDismiss = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible(false)
    setDismissed(true)
    setExpanded(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-6 z-50 flex items-center gap-3"
          initial={{ y: 80, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: 16, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.9 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="rounded-2xl px-5 py-3 text-sm font-syne font-medium text-white pointer-events-none"
                style={{
                  background: 'rgba(13,20,36,0.92)',
                  border: '1px solid rgba(108,99,255,0.35)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(108,99,255,0.2)',
                  whiteSpace: 'nowrap',
                }}
              >
                Book a 30-min discovery call →
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Link to="/contact">
              <motion.button
                className="relative flex items-center gap-2.5 rounded-2xl font-syne font-semibold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)',
                  boxShadow: '0 6px 32px rgba(108,99,255,0.55), 0 2px 8px rgba(0,0,0,0.3)',
                  padding: '14px 22px',
                  fontSize: '14px',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 40px rgba(108,99,255,0.7), 0 2px 12px rgba(0,0,0,0.3)',
                }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setExpanded(true)}
                onHoverEnd={() => setExpanded(false)}
              >
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                />
                <CalendarDays size={16} className="shrink-0" />
                Request a Demo
              </motion.button>
            </Link>

            <motion.button
              onClick={handleDismiss}
              className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              style={{
                background: 'rgba(13,20,36,0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Dismiss"
            >
              <X size={10} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
