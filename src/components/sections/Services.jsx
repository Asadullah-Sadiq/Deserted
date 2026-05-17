import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    emoji: '🤖',
    title: 'AI & Machine Learning',
    description: 'Intelligent automation, NLP, computer vision, predictive analytics — built to solve real business challenges at scale.',
    color: '#6C63FF',
    tags: ['Enterprise', 'Scalable'],
    href: '/services#ai',
  },
  {
    emoji: '🌐',
    title: 'Web Development',
    description: 'Full-stack React/Next.js apps, PWAs, e-commerce platforms, and headless CMS solutions that perform and convert.',
    color: '#00D4FF',
    tags: ['Enterprise', 'Scalable'],
    href: '/services#web',
  },
  {
    emoji: '☁️',
    title: 'Cloud Infrastructure',
    description: 'AWS/GCP/Azure architecture, DevOps pipelines, CI/CD, Kubernetes orchestration, and microservices design.',
    color: '#00E5A0',
    tags: ['Enterprise', 'Scalable'],
    href: '/services#cloud',
  },
  {
    emoji: '📱',
    title: 'Mobile Development',
    description: 'React Native and Flutter cross-platform apps, plus native iOS & Android — built for performance and retention.',
    color: '#FFB347',
    tags: ['Enterprise', 'Scalable'],
    href: '/services#mobile',
  },
  {
    emoji: '🛡️',
    title: 'Cybersecurity',
    description: 'Penetration testing, security audits, compliance automation, and SIEM solutions to protect your infrastructure.',
    color: '#FF6B6B',
    tags: ['Enterprise', 'Scalable'],
    href: '/services#security',
  },
  {
    emoji: '📈',
    title: 'Data & Analytics',
    description: 'BI dashboards, data pipelines, real-time analytics, and ETL systems that turn raw data into decisions.',
    color: '#FF6B9D',
    tags: ['Enterprise', 'Scalable'],
    href: '/services#data',
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.21, 1.11, 0.81, 0.99] }}
    >
      <Link to={service.href} className="block h-full">
        <motion.div
          className="relative h-full flex flex-col rounded-3xl p-8 cursor-pointer overflow-hidden"
          style={{
            background: '#111432',
            border: `1px solid ${service.color}33`,
          }}
          whileHover={{
            y: -8,
            borderColor: service.color,
            boxShadow: `0 20px 60px ${service.color}22, 0 0 0 1px ${service.color}44`,
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          {/* Subtle background glow */}
          <div
            className="absolute inset-0 opacity-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{ background: `radial-gradient(ellipse at top left, ${service.color}0d 0%, transparent 70%)` }}
          />

          {/* Icon circle */}
          <motion.div
            className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${service.color}33 0%, ${service.color}15 100%)`,
              boxShadow: `0 0 24px ${service.color}33`,
            }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.25 }}
          >
            {service.emoji}
          </motion.div>

          {/* Tags */}
          <div className="relative z-10 flex gap-2 mb-4">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-syne font-medium px-3 py-1 rounded-full"
                style={{
                  background: `${service.color}15`,
                  color: service.color,
                  border: `1px solid ${service.color}33`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="relative z-10 font-syne font-semibold text-white mb-3" style={{ fontSize: '22px' }}>
            {service.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 font-sans text-gray-400 leading-relaxed flex-1 mb-6" style={{ fontSize: '15px' }}>
            {service.description}
          </p>

          {/* Learn More */}
          <div className="relative z-10 flex items-center gap-2 text-sm font-syne font-medium group/link" style={{ color: service.color }}>
            Learn More
            <motion.span
              className="inline-flex items-center"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

function AnimatedUnderline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex justify-center mt-4">
      <motion.div
        className="h-0.5 rounded-full"
        style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF, #FF6B9D)' }}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 120, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function Services() {
  return (
    <section className="section-padding relative overflow-hidden" id="services">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-max relative">
        {/* Section Header */}
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
              background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
            }}
          >
            What We Build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-bold text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15 }}
          >
            End-to-End Digital Solutions
          </motion.h2>

          <AnimatedUnderline />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: '17px' }}
          >
            Six core disciplines, one unified mission — turning your boldest technology<br className="hidden md:block" />
            ambitions into production-grade reality.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link to="/services">
            <button className="btn-ghost text-sm font-syne px-6 py-3 rounded-xl">
              View All Services <ArrowRight size={14} className="inline ml-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
