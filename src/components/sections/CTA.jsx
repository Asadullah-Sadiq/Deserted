import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CalendarDays, Handshake } from 'lucide-react'
import ProjectModal from '../modals/ProjectModal'
import CallModal from '../modals/CallModal'
import PartnerModal from '../modals/PartnerModal'

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: `${(i * 37) % 100}%`,
  y: `${(i * 53) % 100}%`,
  size: (i % 3) + 1.5,
  delay: (i * 0.17) % 4,
  dur: 3 + (i % 4),
}))

export default function CTA() {
  const [modal, setModal] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <section className="section-padding relative overflow-hidden" ref={ref}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
            className="relative rounded-3xl overflow-hidden"
            style={{ padding: '2px', background: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 35%, #00E5A0 60%, #FF6B9D 100%)' }}
          >
            {/* Inner card */}
            <div
              className="relative rounded-[22px] overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #080d1f 0%, #0d1232 50%, #0a0f1e 100%)' }}
            >
              {/* Animated grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.06) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />

              {/* Floating orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)', filter: 'blur(40px)', transform: 'translate(30%, -30%)' }} />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)', filter: 'blur(40px)', transform: 'translate(-30%, 30%)' }} />
              <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.07) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-50%, -50%)' }} />

              {/* Particle dots */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map(p => (
                  <motion.div key={p.id} className="absolute rounded-full"
                    style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: 'rgba(255,255,255,0.25)' }}
                    animate={{ opacity: [0.1, 0.6, 0.1], y: [-4, 4, -4] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>

              <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-indigo-300 text-sm font-syne font-medium">Now Accepting New Partners</span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="font-syne font-extrabold text-white leading-tight mb-5"
                  style={{ fontSize: 'clamp(36px, 6vw, 68px)' }}
                >
                  Ready to Build
                  <br />
                  <span style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF, #FF6B9D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Something Extraordinary?
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.28, duration: 0.6 }}
                  className="text-gray-400 text-lg max-w-xl mx-auto mb-12"
                >
                  One conversation. A clear technical path. Let's turn your vision into production-grade reality.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <motion.button
                    onClick={() => setModal('project')}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-syne font-semibold text-[15px]"
                    style={{ background: '#ffffff', color: '#0a0f22', boxShadow: '0 4px 20px rgba(255,255,255,0.15)' }}
                  >
                    Start a Project <ArrowRight size={16} />
                  </motion.button>

                  <motion.button
                    onClick={() => setModal('call')}
                    whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-syne font-semibold text-[15px] text-white transition-colors"
                    style={{ border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)' }}
                  >
                    <CalendarDays size={16} /> Schedule a Call
                  </motion.button>
                </motion.div>

                {/* Trust row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
                >
                  {['No commitment required', 'Response within 24 hours', 'Free technical consultation', 'NDA available'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6C63FF' }} />
                      {item}
                    </div>
                  ))}
                </motion.div>

                {/* Partnership link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <button
                    onClick={() => setModal('partner')}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors font-syne"
                  >
                    <Handshake size={14} />
                    Interested in a partnership?
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal isOpen={modal === 'project'} onClose={() => setModal(null)} />
      <CallModal    isOpen={modal === 'call'}    onClose={() => setModal(null)} />
      <PartnerModal isOpen={modal === 'partner'} onClose={() => setModal(null)} />
    </>
  )
}
