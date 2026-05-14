import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-dark-700 to-accent-900/60" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/15 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          {/* Border gradient */}
          <div className="absolute inset-0 rounded-3xl" style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(217,70,239,0.2), rgba(34,211,238,0.15))',
            mask: 'linear-gradient(white, white) padding-box, linear-gradient(white, white)',
            WebkitMask: 'linear-gradient(white, white) padding-box, linear-gradient(white, white)',
            padding: '1px',
          }} />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/25 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-primary-300 text-sm font-syne font-medium">Now Accepting New Partners</span>
            </motion.div>

            <h2 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Ready to Build
              <br />
              <span className="gradient-text">Something Exceptional?</span>
            </h2>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Let's talk about your challenges. In one call, we'll outline a clear technical path 
              and show you exactly what's possible with your data and systems.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Start a Conversation
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" icon={<Calendar size={18} />} iconPosition="left">
                  Schedule a Demo
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
            >
              {['No commitment required', 'Response within 24 hours', 'Free technical consultation', 'NDA available'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
