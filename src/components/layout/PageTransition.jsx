import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/* ─── Iris / circular-reveal transition ─────────────────────────────────────
   On every route change the overlay expands as a circle from center
   (covering the old page), then contracts back (revealing the new page).
   Color: rich space-mesh gradient  violet → indigo → deep teal + cyan glow.
─────────────────────────────────────────────────────────────────────────── */
export function TransitionOverlay() {
  const location = useLocation()
  const controls = useAnimationControls()
  const mountTime = useRef(0)

  /* Record mount time and ensure overlay starts fully hidden */
  useEffect(() => {
    mountTime.current = Date.now()
    controls.set({ clipPath: 'circle(0% at 50% 50%)', opacity: 0 })
  }, [])

  useEffect(() => {
    /* Skip if fired within 700 ms of mount — it's the initial page load */
    if (Date.now() - mountTime.current < 700) return

    const run = async () => {
      /* 1 – reset: tiny dot at center, invisible */
      controls.set({
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 1,
      })

      /* 2 – EXPAND: circle grows to cover full screen */
      await controls.start({
        clipPath: 'circle(150% at 50% 50%)',
        transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
      })

      /* brief pause so the new page mounts under the overlay */
      await new Promise(r => setTimeout(r, 60))

      /* 3 – CONTRACT: circle shrinks back from center */
      await controls.start({
        clipPath: 'circle(0% at 50% 50%)',
        transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
      })

      /* hide completely so it never blocks pointer events */
      controls.set({ opacity: 0 })
    }

    run()
  }, [location.key])

  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
      animate={controls}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        willChange: 'clip-path',
        /* ── Space mesh base ── */
        background: [
          'radial-gradient(ellipse at 15% 35%, #7C3AED 0%, transparent 55%)',
          'radial-gradient(ellipse at 85% 65%, #06B6D4 0%, transparent 50%)',
          'radial-gradient(ellipse at 50% 50%, #4338CA 0%, #1e1b4b 45%, #050816 100%)',
        ].join(', '),
      }}
    >
      {/* Cyan glow bloom – top right */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Violet glow bloom – bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Animated grid lines for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'linear-gradient(rgba(108,99,255,0.08) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(108,99,255,0.08) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Centered brand wordmark */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(0,212,255,0.3)',
            fontSize: 26,
          }}
        >
          ⚡
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: '0.06em',
            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
          }}
        >
          DIGITECH
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          AI &amp; Tech Services
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Per-page content animation ─────────────────────────────────────────── */
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
