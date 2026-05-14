import { Component, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return <FallbackCanvas />
    }
    return this.props.children
  }
}

const particleColors = ['#6366f1', '#818cf8', '#a5b4fc', '#d946ef', '#c084fc', '#22d3ee', '#67e8f9']
const particles = [...Array(28)].map((_, i) => ({
  size: Math.random() * 5 + 2,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  color: particleColors[i % particleColors.length],
  yMove: -(Math.random() * 40 + 10),
  xMove: (Math.random() - 0.5) * 30,
  opacity: Math.random() * 0.5 + 0.3,
  duration: Math.random() * 5 + 4,
  delay: Math.random() * 4,
}))

export function FallbackCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 h-72 lg:w-[460px] lg:h-[460px]">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 35%, rgba(129,140,248,0.45) 0%, rgba(99,102,241,0.25) 50%, rgba(217,70,239,0.12) 100%)' }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-16 rounded-full blur-md"
            style={{ background: 'radial-gradient(circle at 40% 40%, rgba(139,92,246,0.75) 0%, rgba(99,102,241,0.55) 60%, transparent 100%)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <div className="absolute inset-20 rounded-full" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />

          <motion.div
            className="absolute rounded-full border border-primary-500/25"
            style={{ inset: '-10%' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full border border-accent-500/15"
            style={{ inset: '-18%' }}
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full border border-cyan-500/10"
            style={{ inset: '-28%' }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, background: p.color }}
          animate={{ y: [0, p.yMove, 0], x: [0, p.xMove, 0], opacity: [0.15, p.opacity, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const ThreeScene = lazy(() =>
  import('./ThreeScene').catch(() => ({ default: FallbackCanvas }))
)

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <WebGLErrorBoundary>
        <Suspense fallback={<FallbackCanvas />}>
          <ThreeScene />
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  )
}
