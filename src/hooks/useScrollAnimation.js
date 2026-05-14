import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options.once !== false,
    margin: options.margin || '0px 0px -100px 0px',
    amount: options.amount || 0.1,
  })

  return { ref, isInView }
}

export const useParallax = (factor = 0.5) => {
  const ref = useRef(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = window.scrollY
      const offset = (rect.top + scrolled) * factor * 0.1
      el.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [factor])

  return ref
}
