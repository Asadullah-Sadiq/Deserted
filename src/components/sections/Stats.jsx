import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Award, Globe } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 200,
    suffix: '+',
    label: 'Enterprise Clients',
    description: 'Fortune 500s to fast-growing startups',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Client Retention',
    description: 'Our results speak for themselves',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Award,
    value: 50,
    suffix: 'M+',
    label: 'Data Points Processed',
    description: 'Daily across all client systems',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Globe,
    value: 30,
    suffix: '+',
    label: 'Countries Served',
    description: 'Global delivery, local expertise',
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20',
  },
]

function AnimatedCounter({ value, suffix, color, isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)

      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span className={`font-syne font-extrabold text-5xl md:text-6xl ${color}`}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-dark-800 to-accent-900/10" />
        <div className="absolute top-0 left-0 right-0 h-px glow-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px glow-line" />
      </div>

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gray-500 font-syne text-sm tracking-widest uppercase mb-3">By the numbers</p>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-white">
            Proven Results at <span className="gradient-text">Scale</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className={`glass rounded-2xl p-8 text-center border ${stat.border} hover:border-opacity-60 transition-all duration-500 group relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 70%)` }} />

                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={stat.color} />
                  </div>

                  <div className="mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      color={stat.color}
                      isInView={isInView}
                    />
                  </div>

                  <h3 className="font-syne font-semibold text-white text-lg mb-1">
                    {stat.label}
                  </h3>

                  <p className="text-gray-500 text-sm">{stat.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
