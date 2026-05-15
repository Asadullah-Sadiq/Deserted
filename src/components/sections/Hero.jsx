import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import HeroCanvas from '../3d/HeroCanvas'


export default function Hero() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.3,
      })
    }, textRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 3D Canvas - full hero background */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0"
      >
        <HeroCanvas />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-max section-padding w-full"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Badge variant="default" animate>
              <Sparkles size={10} className="text-primary-400" />
              The Future of Enterprise AI
            </Badge>
          </motion.div>

          <div ref={textRef} className="overflow-hidden mb-6">
            <h1 className="font-syne font-extrabold text-6xl md:text-7xl lg:text-8xl leading-[0.92] text-white">
              {'We Engineer'.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">
                  <span className="hero-word inline-block">{word}</span>
                </span>
              ))}
              <br />
              {'The'.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">
                  <span className="hero-word inline-block">{word}</span>
                </span>
              ))}
              <span className="hero-word inline-block gradient-text">Future</span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-10 max-w-2xl"
          >
            End-to-end AI solutions, cloud architecture, and data intelligence 
            that transform enterprise operations and unlock exponential growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link to="/contact">
              <Button size="lg" icon={<ArrowRight size={18} />}>
                Start Your Project
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="ghost" size="lg" icon={<Play size={16} className="fill-current" />} iconPosition="left">
                View Services
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-dark-900 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white"
                  style={{ zIndex: 4 - i }}
                >
                  {['A', 'B', 'C', 'D'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                <span className="text-white font-semibold">4.9/5</span> from 200+ enterprise clients
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>


      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-gray-600 font-syne tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
