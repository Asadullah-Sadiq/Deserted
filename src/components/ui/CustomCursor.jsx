import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const springCfg = { damping: 28, stiffness: 320, mass: 0.4 }
  const ringX = useSpring(cursorX, springCfg)
  const ringY = useSpring(cursorY, springCfg)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    setIsDesktop(true)

    const onMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setHidden(false)
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')) {
        setHovered(true)
      }
    }

    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')) {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (!isDesktop) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: cursorX, y: cursorY,
          translateX: '-50%', translateY: '-50%',
          width: 8, height: 8,
          borderRadius: '50%',
          background: hovered ? '#00D4FF' : 'rgba(108,99,255,0.95)',
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: hidden ? 0 : 1,
          mixBlendMode: 'screen',
          transition: 'background 0.2s ease, opacity 0.15s ease',
          willChange: 'transform',
        }}
      />

      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: hidden ? 0 : 1,
          willChange: 'transform',
        }}
        animate={{
          width: hovered ? 60 : 40,
          height: hovered ? 60 : 40,
          borderColor: hovered ? 'rgba(0,212,255,0.75)' : 'rgba(108,99,255,0.55)',
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        initial={{
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(108,99,255,0.55)',
        }}
      />
    </>
  )
}
