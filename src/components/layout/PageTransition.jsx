import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function TransitionOverlay() {
  const location = useLocation()
  const controls = useAnimationControls()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const run = async () => {
      controls.set({ x: '-101%', skewX: '-3deg' })

      await controls.start({
        x: '0%',
        skewX: '0deg',
        transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] },
      })

      await controls.start({
        x: '101%',
        skewX: '3deg',
        transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
      })

      controls.set({ x: '-101%', skewX: '-3deg' })
    }

    run()
  }, [location.key])

  return (
    <motion.div
      animate={controls}
      style={{
        position: 'fixed',
        top: -10,
        left: 0,
        right: 0,
        bottom: -10,
        zIndex: 9998,
        background: 'linear-gradient(110deg, #4f46e5 0%, #6C63FF 30%, #00D4FF 70%, #4f46e5 100%)',
        backgroundSize: '200% 100%',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {/* Subtle noise texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.07,
          pointerEvents: 'none',
        }}
      />

      {/* Brand mark in center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 28,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          Digitech
        </div>
      </div>
    </motion.div>
  )
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
