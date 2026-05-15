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
    if (this.state.hasError) return <FallbackCanvas />
    return this.props.children
  }
}

/* Pre-calculated so they don't change on re-render */
const particles = [...Array(55)].map((_, i) => {
  const colors = ['#6C63FF','#818cf8','#a78bfa','#00D4FF','#67e8f9','#c084fc','#00E5A0']
  return {
    size:     Math.random() * 4 + 1.5,
    left:     `${Math.random() * 100}%`,
    top:      `${Math.random() * 100}%`,
    color:    colors[i % colors.length],
    yMove:    -(Math.random() * 50 + 15),
    xMove:    (Math.random() - 0.5) * 40,
    opacity:  Math.random() * 0.55 + 0.25,
    duration: Math.random() * 5 + 4,
    delay:    Math.random() * 4,
  }
})

/* Wireframe-like geometric decorations (CSS only) */
const geoShapes = [
  { size: 140, x: '72%', y: '18%', border: '#6C63FF', opacity: 0.35, rotate: 45,  duration: 22, clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { size: 100, x: '8%',  y: '62%', border: '#00D4FF', opacity: 0.30, rotate: -30, duration: 28, clip: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
  { size: 120, x: '60%', y: '72%', border: '#a78bfa', opacity: 0.25, rotate: 20,  duration: 34, clip: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
]

export function FallbackCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">

      {/* Central orb cluster — now right-center like the 3D scene */}
      <div className="absolute" style={{ right: '8%', top: '50%', transform: 'translateY(-50%)' }}>
        <div className="relative" style={{ width: 420, height: 420 }}>
          {/* Outer glow halo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.10) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.22, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Cyan secondary glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '10%',
              background: 'radial-gradient(circle at 65% 35%, rgba(0,212,255,0.12) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          {/* Main orb */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: '14%',
              background: 'radial-gradient(circle at 35% 32%, rgba(167,139,250,0.55) 0%, rgba(108,99,255,0.38) 45%, rgba(0,212,255,0.18) 100%)',
            }}
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Inner bright core */}
          <motion.div
            className="absolute rounded-full blur-sm"
            style={{
              inset: '26%',
              background: 'radial-gradient(circle at 38% 35%, rgba(200,190,255,0.85) 0%, rgba(108,99,255,0.65) 55%, transparent 100%)',
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          {/* Specular highlight */}
          <div
            className="absolute rounded-full"
            style={{ inset: '32%', background: 'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.18) 0%, transparent 55%)' }}
          />

          {/* Orbit rings */}
          {[
            { inset: '-8%',  border: 'rgba(108,99,255,0.3)',  dur: 18, dir:  1 },
            { inset: '-16%', border: 'rgba(0,212,255,0.18)',   dur: 25, dir: -1 },
            { inset: '-26%', border: 'rgba(167,139,250,0.12)', dur: 36, dir:  1 },
          ].map((r, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ inset: r.inset, border: `1px solid ${r.border}` }}
              animate={{ rotate: [0, 360 * r.dir] }}
              transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      </div>

      {/* CSS wireframe geometric shapes */}
      {geoShapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: s.x, top: s.y,
            width: s.size, height: s.size,
            opacity: s.opacity,
            border: `1.5px solid ${s.border}`,
            clipPath: s.clip,
            boxShadow: `0 0 12px ${s.border}60`,
          }}
          animate={{ rotate: [s.rotate, s.rotate + 360] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: p.left, top: p.top,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}80`,
          }}
          animate={{
            y:       [0, p.yMove, 0],
            x:       [0, p.xMove, 0],
            opacity: [0.1, p.opacity, 0.1],
            scale:   [0.7, 1.3, 0.7],
          }}
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
