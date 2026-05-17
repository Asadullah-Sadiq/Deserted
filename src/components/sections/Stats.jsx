import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
  { value: 12,  suffix: '+', label: 'Countries Served' },
  { value: 5,   suffix: '+', label: 'Years Experience' },
]

const gradients = [
  'linear-gradient(135deg, #6C63FF, #00D4FF)',
  'linear-gradient(135deg, #00D4FF, #00E5A0)',
  'linear-gradient(135deg, #00E5A0, #FFB347)',
  'linear-gradient(135deg, #FF6B9D, #6C63FF)',
]

const glows = [
  'rgba(108,99,255,0.35)',
  'rgba(0,212,255,0.35)',
  'rgba(0,229,160,0.35)',
  'rgba(255,107,157,0.35)',
]

function AnimatedCounter({ value, suffix, gradient, isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const steps = 60
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.min(Math.round(value * eased), value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span
      className="font-mono font-bold leading-none"
      style={{
        fontSize: 'clamp(36px, 10vw, 64px)',
        fontFamily: "'JetBrains Mono', monospace",
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(135deg, #080d1a 0%, #0d1228 40%, #0a0f1e 70%, #10152e 100%)',
      }}
    >
      {/* Top & bottom edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(0,212,255,0.4), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(0,212,255,0.4), transparent)' }} />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="container-max relative">
        <div className="flex flex-col sm:flex-row items-center justify-center divide-y divide-white/5 sm:divide-y-0 gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-stretch w-full sm:w-auto flex-1">
              {/* Stat content */}
              <motion.div
                className="flex flex-col items-center justify-center text-center px-6 sm:px-8 py-8 sm:py-10 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
              >
                {/* Number with glow underneath */}
                <div className="relative mb-3">
                  {/* Glow blur behind number */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full blur-2xl opacity-50"
                    style={{ background: glows[i], transform: 'scaleX(1.4) translateY(20%)' }}
                  />
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    gradient={gradients[i]}
                    isInView={isInView}
                  />
                </div>

                <p
                  className="font-sans text-gray-400 mt-1"
                  style={{ fontSize: '16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                >
                  {stat.label}
                </p>
              </motion.div>

              {/* Vertical separator (not after last item) */}
              {i < stats.length - 1 && (
                <motion.div
                  className="hidden sm:block self-stretch w-px shrink-0"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.35), rgba(0,212,255,0.25), transparent)' }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
