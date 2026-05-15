import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, Zap, Code2, Brain, Cloud, Flame, Database } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import HeroCanvas from '../3d/HeroCanvas'

/* ─── Floating tech badges ─── */
const techBadges = [
  { icon: Code2,    label: 'React',    color: '#61DAFB', delay: 0.1, x: '6%',  y: '22%' },
  { icon: Brain,    label: 'AI / ML',  color: '#6C63FF', delay: 0.3, x: '82%', y: '18%' },
  { icon: Cloud,    label: 'Cloud',    color: '#00D4FF', delay: 0.5, x: '78%', y: '68%' },
  { icon: Flame,    label: 'Node.js',  color: '#68A063', delay: 0.2, x: '5%',  y: '70%' },
  { icon: Database, label: 'Firebase', color: '#FFCA28', delay: 0.4, x: '44%', y: '88%' },
]

function TechBadge({ icon: Icon, label, color, delay, x, y }) {
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-chip"
      style={{
        left: x, top: y,
        background: 'rgba(13,15,38,0.85)',
        border: `1px solid ${color}40`,
        boxShadow: `0 0 16px ${color}30`,
        backdropFilter: 'blur(12px)',
        zIndex: 20,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay + 1.8, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2"
      >
        <Icon size={13} style={{ color }} />
        <span className="text-xs font-syne font-semibold text-white/90 whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Shimmer button wrapper ─── */
function ShimmerButton({ children, className = '', ...props }) {
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-btn font-syne font-semibold text-[15px] text-white overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
        boxShadow: '0 4px 24px rgba(108,99,255,0.45)',
      }}
      whileHover={{ scale: 1.04, boxShadow: '0 6px 32px rgba(108,99,255,0.65)' }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* shimmer sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />
      {children}
    </motion.button>
  )
}

const wordVariant = {
  hidden: { y: 60, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, delay: 0.3 + i * 0.09, ease: [0.21, 1.11, 0.81, 0.99] },
  }),
}

const ctaVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 280, damping: 20, delay: 1.2 + i * 0.15 },
  }),
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const y       = useTransform(scrollY, [0, 600], [0, 140])
  const opacity = useTransform(scrollY, [0, 380], [1, 0])

  const line1 = 'Transforming Ideas'.split(' ')
  const line2 = 'Into Digital Power'.split(' ')

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#050816' }}
    >
      {/* ── Background radial glows ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 15% 50%, rgba(108,99,255,0.14) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 85% 40%, rgba(0,212,255,0.10) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* ── 3D Canvas ── */}
      <motion.div style={{ opacity }} className="absolute inset-0">
        <HeroCanvas />
      </motion.div>

      {/* ── Floating tech badges ── */}
      {techBadges.map((b) => <TechBadge key={b.label} {...b} />)}

      {/* ── Hero content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-max section-padding w-full"
      >
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mb-8 inline-flex"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-chip font-syne font-semibold text-[13px]"
              style={{
                background: 'rgba(108,99,255,0.12)',
                border: '1px solid rgba(108,99,255,0.4)',
                color: '#a78bfa',
                boxShadow: '0 0 20px rgba(108,99,255,0.25)',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <Zap size={12} className="fill-current" />
              </motion.span>
              AI-Powered Digital Innovation
            </span>
          </motion.div>

          {/* H1 — line 1 */}
          <div className="overflow-hidden mb-1">
            <h1 className="font-syne font-extrabold leading-[1] text-white" style={{ fontSize: 'clamp(44px,7vw,92px)', letterSpacing: '-0.02em' }}>
              {line1.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariant}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.22em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* H1 — line 2 gradient */}
          <div className="overflow-hidden mb-8">
            <h1 className="font-syne font-extrabold leading-[1.05]" style={{ fontSize: 'clamp(44px,7vw,92px)', letterSpacing: '-0.02em' }}>
              {line2.map((word, i) => (
                <motion.span
                  key={word}
                  custom={line1.length + i}
                  variants={wordVariant}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.22em] gradient-text"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="text-[18px] leading-[1.75] mb-10 max-w-xl"
            style={{ color: '#8B8BA7' }}
          >
            We architect cutting-edge AI platforms, scalable web applications,
            and cloud infrastructure that accelerates growth.
          </motion.p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <motion.div custom={0} variants={ctaVariant} initial="hidden" animate="visible">
              <Link to="/contact">
                <ShimmerButton>
                  Start a Project <ArrowRight size={16} />
                </ShimmerButton>
              </Link>
            </motion.div>

            <motion.div custom={1} variants={ctaVariant} initial="hidden" animate="visible">
              <Link to="/services">
                <motion.button
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-btn font-syne font-semibold text-[15px]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#F0F0FF',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{
                    borderColor: 'rgba(108,99,255,0.5)',
                    background: 'rgba(108,99,255,0.08)',
                    boxShadow: '0 0 24px rgba(108,99,255,0.2)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.4)' }}
                  >
                    <Play size={10} className="fill-current text-primary-400 ml-0.5" />
                  </span>
                  Watch Demo
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex -space-x-2">
              {['A','B','C','D'].map((l, i) => (
                <div
                  key={l}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    borderColor: '#050816',
                    background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                    zIndex: 4 - i,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs" style={{ color: '#8B8BA7' }}>
                <span className="text-white font-semibold">4.9/5</span> from 200+ enterprise clients
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-[11px] font-syne tracking-[0.2em] uppercase" style={{ color: '#8B8BA7' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ color: '#8B8BA7' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
