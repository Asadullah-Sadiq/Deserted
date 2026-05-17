import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: "Digitech's AI solution increased our revenue by 34% in just 3 months. Their team delivered beyond expectations — the quality of engineering is unmatched.",
    author: 'Alexandra Chen',
    title: 'CTO @ TechVentures',
    avatar: 'AC',
    gradient: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
    glow: 'rgba(108,99,255,0.4)',
    border: 'rgba(108,99,255,0.25)',
    quoteColor: '#6C63FF',
  },
  {
    quote: "The cloud migration was flawless. Zero downtime, 60% cost reduction. Best technical partner we've ever worked with — period.",
    author: 'Sarah Mitchell',
    title: 'VP Engineering @ ScaleUp Inc',
    avatar: 'SM',
    gradient: 'linear-gradient(135deg, #00D4FF, #00E5A0)',
    glow: 'rgba(0,212,255,0.4)',
    border: 'rgba(0,212,255,0.25)',
    quoteColor: '#00D4FF',
  },
  {
    quote: "Our mobile app hit 100K downloads in 2 months post-launch. Digitech's team is simply world-class — they treat your product like their own.",
    author: 'James Rodriguez',
    title: 'CEO @ InnovateCo',
    avatar: 'JR',
    gradient: 'linear-gradient(135deg, #FF6B9D, #6C63FF)',
    glow: 'rgba(255,107,157,0.4)',
    border: 'rgba(255,107,157,0.25)',
    quoteColor: '#FF6B9D',
  },
  {
    quote: "We integrated their ML pipeline into our data stack in 3 weeks. What would have taken us a year to build internally, they delivered fast and flawlessly.",
    author: 'David Park',
    title: 'Head of Data @ Nexora Labs',
    avatar: 'DP',
    gradient: 'linear-gradient(135deg, #00E5A0, #00D4FF)',
    glow: 'rgba(0,229,160,0.4)',
    border: 'rgba(0,229,160,0.25)',
    quoteColor: '#00E5A0',
  },
  {
    quote: "Security audit uncovered 12 critical vulnerabilities we didn't know existed. Their cybersecurity team is thorough, fast, and genuinely world-class.",
    author: 'Priya Sharma',
    title: 'CISO @ FinScale Global',
    avatar: 'PS',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FFB347)',
    glow: 'rgba(255,107,107,0.4)',
    border: 'rgba(255,107,107,0.25)',
    quoteColor: '#FF6B6B',
  },
  {
    quote: "They rebuilt our entire React frontend in 6 weeks. Performance improved 4x, bounce rate dropped 40%. The team's attention to detail is extraordinary.",
    author: 'Marcus Webb',
    title: 'CPO @ CartFlow',
    avatar: 'MW',
    gradient: 'linear-gradient(135deg, #a78bfa, #6C63FF)',
    glow: 'rgba(167,139,250,0.4)',
    border: 'rgba(167,139,250,0.25)',
    quoteColor: '#a78bfa',
  },
]

const AUTOPLAY_INTERVAL = 4500

function StarRating() {
  return (
    <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{ color: '#FFD700', fontSize: '16px', textShadow: '0 0 8px rgba(255,215,0,0.5)', lineHeight: 1 }}
          aria-hidden="true"
        >★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div
      className="relative flex flex-col rounded-3xl p-8 h-full select-none"
      style={{
        background: 'rgba(13,18,40,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${t.border}`,
        boxShadow: `0 8px 48px ${t.glow}, 0 2px 16px rgba(0,0,0,0.4)`,
        minHeight: 300,
      }}
    >
      <div
        className="absolute top-4 left-6 leading-none pointer-events-none select-none"
        style={{
          fontSize: '100px', lineHeight: 1, fontFamily: 'Georgia, serif',
          background: `linear-gradient(135deg, ${t.quoteColor}55, ${t.quoteColor}11)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
        aria-hidden="true"
      >"</div>

      <div className="relative z-10 flex flex-col h-full">
        <StarRating />
        <blockquote
          className="flex-1 leading-relaxed text-gray-200 mb-8"
          style={{ fontSize: '17px', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontWeight: 400 }}
        >
          "{t.quote}"
        </blockquote>

        <div className="flex items-center gap-4 mt-auto">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-syne font-bold text-white shrink-0"
            style={{ background: t.gradient, boxShadow: `0 4px 20px ${t.glow}`, fontSize: '13px' }}
            aria-hidden="true"
          >{t.avatar}</div>
          <div>
            <p className="font-syne font-bold text-white" style={{ fontSize: '15px' }}>{t.author}</p>
            <p className="text-gray-500" style={{ fontSize: '13px', fontFamily: "'DM Sans', sans-serif" }}>{t.title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const dragStartX = useRef(0)
  const total = testimonials.length

  const go = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent((idx + total) % total)
  }, [total])

  const next = useCallback(() => go(current + 1, 1), [current, go])
  const prev = useCallback(() => go(current - 1, -1), [current, go])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <section className="section-padding relative overflow-hidden" id="testimonials" aria-label="Client Testimonials">
      <div
        className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="container-max relative">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="font-syne font-semibold mb-4"
            style={{
              fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #6C63FF, #FF6B9D)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >Client Stories</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15 }}
          >What Our Clients Say</motion.h2>
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card track */}
          <div
            className="overflow-hidden rounded-3xl"
            onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - dragStartX.current
              if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TestimonialCard t={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 hidden md:flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(240,240,255,0.7)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(108,99,255,0.2)'
              e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'
              e.currentTarget.style.color = '#a78bfa'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(240,240,255,0.7)'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 hidden md:flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(240,240,255,0.7)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(108,99,255,0.2)'
              e.currentTarget.style.borderColor = 'rgba(108,99,255,0.5)'
              e.currentTarget.style.color = '#a78bfa'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(240,240,255,0.7)'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => go(i, i > current ? 1 : -1)}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current
                  ? 'linear-gradient(90deg, #6C63FF, #00D4FF)'
                  : 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Mobile prev/next */}
        <div className="flex justify-center gap-3 mt-6 md:hidden">
          <button
            onClick={prev} aria-label="Previous"
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,240,255,0.7)' }}
          ><ChevronLeft size={16} /></button>
          <button
            onClick={next} aria-label="Next"
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,240,255,0.7)' }}
          ><ChevronRight size={16} /></button>
        </div>

        {/* Slide counter */}
        <p className="text-center mt-4 font-syne text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>
    </section>
  )
}
