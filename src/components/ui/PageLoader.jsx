import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1100
    let rafId

    const tick = (now) => {
      const elapsed = now - start
      const p = Math.min(100, (elapsed / duration) * 100)
      setProgress(p)
      if (p < 100) {
        rafId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setVisible(false), 180)
      }
    }

    rafId = requestAnimationFrame(tick)
    const hardStop = setTimeout(() => setVisible(false), 1500)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(hardStop)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99997,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: [
              'radial-gradient(ellipse at 15% 35%, rgba(108,99,255,0.18) 0%, transparent 55%)',
              'radial-gradient(ellipse at 85% 65%, rgba(0,212,255,0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, #0d0f26 0%, #050816 100%)',
            ].join(', '),
          }}
          aria-hidden="true"
        >
          <div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: [
                'linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px)',
                'linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)',
              ].join(', '),
              backgroundSize: '60px 60px',
            }}
          />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 52 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(0,212,255,0.2)',
                  '0 0 70px rgba(108,99,255,0.9), 0 0 120px rgba(0,212,255,0.35)',
                  '0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(0,212,255,0.2)',
                ],
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 64, height: 64, borderRadius: 20,
                background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32,
              }}
            >
              ⚡
            </motion.div>

            <div style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26,
              letterSpacing: '0.06em',
              background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              DIGITECH
            </div>

            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11,
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              AI &amp; Tech Services
            </div>
          </motion.div>

          <div style={{
            width: 200, height: 2,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 2, overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%', borderRadius: 2,
                background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(108,99,255,0.9)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 14,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.12em',
            }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
