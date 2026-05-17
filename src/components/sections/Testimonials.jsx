import { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Digitech's AI solution increased our revenue by 34% in just 3 months. Their team delivered beyond expectations.",
    author: 'Alexandra Chen',
    title: 'CTO @ TechVentures',
    avatar: 'AC',
    gradient: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
    glow: 'rgba(108,99,255,0.35)',
    border: 'rgba(108,99,255,0.2)',
    quoteColor: '#6C63FF',
  },
  {
    quote: "The cloud migration was flawless. Zero downtime, 60% cost reduction. Best technical partner we've ever worked with.",
    author: 'Sarah Mitchell',
    title: 'VP Engineering @ ScaleUp Inc',
    avatar: 'SM',
    gradient: 'linear-gradient(135deg, #00D4FF, #00E5A0)',
    glow: 'rgba(0,212,255,0.35)',
    border: 'rgba(0,212,255,0.2)',
    quoteColor: '#00D4FF',
  },
  {
    quote: "Our mobile app hit 100K downloads in 2 months post-launch. Digitech's team is simply world-class.",
    author: 'James Rodriguez',
    title: 'CEO @ InnovateCo',
    avatar: 'JR',
    gradient: 'linear-gradient(135deg, #FF6B9D, #6C63FF)',
    glow: 'rgba(255,107,157,0.35)',
    border: 'rgba(255,107,157,0.2)',
    quoteColor: '#FF6B9D',
  },
]

const slideFrom = [
  { initial: { opacity: 0, x: -60 } },
  { initial: { opacity: 0, y: 50 } },
  { initial: { opacity: 0, x: 60 } },
]

function StarRating() {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: '#FFD700',
            fontSize: '18px',
            textShadow: '0 0 10px rgba(255,215,0,0.6)',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }) {
  const [hovered, setHovered] = useState(false)
  const from = slideFrom[index]

  return (
    <motion.div
      initial={from.initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.21, 1.11, 0.81, 0.99] }}
      whileHover={{ scale: 1.025, transition: { duration: 0.25 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col rounded-3xl p-8 h-full cursor-default"
      style={{
        background: 'rgba(13,18,40,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? t.border.replace('0.2', '0.5') : t.border}`,
        boxShadow: hovered
          ? `0 8px 48px ${t.glow}, 0 2px 16px rgba(0,0,0,0.4)`
          : '0 4px 32px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Decorative large quote mark */}
      <div
        className="absolute top-5 left-6 leading-none pointer-events-none select-none"
        style={{
          fontSize: '120px',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          background: `linear-gradient(135deg, ${t.quoteColor}55, ${t.quoteColor}11)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        "
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <StarRating />

        <blockquote
          className="flex-1 leading-relaxed text-gray-200 mb-8"
          style={{
            fontSize: '18px',
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          "{t.quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4 mt-auto">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-syne font-bold text-white shrink-0"
            style={{
              background: t.gradient,
              boxShadow: `0 4px 20px ${t.glow}`,
              fontSize: '13px',
            }}
          >
            {t.avatar}
          </div>
          <div>
            <p className="font-syne font-bold text-white" style={{ fontSize: '15px' }}>
              {t.author}
            </p>
            <p className="text-gray-500" style={{ fontSize: '13px', fontFamily: "'DM Sans', sans-serif" }}>
              {t.title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden" id="testimonials">
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
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-syne font-semibold mb-4"
            style={{
              fontSize: '12px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #6C63FF, #FF6B9D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Client Stories
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15 }}
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
