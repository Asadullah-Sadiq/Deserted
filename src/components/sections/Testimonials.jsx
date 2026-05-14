import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const testimonials = [
  {
    quote: "Digitech Offerings transformed our data infrastructure completely. Their AI pipeline processes 10M+ records daily with 99.97% accuracy. The ROI in the first quarter alone justified the entire engagement.",
    author: "Sarah Chen",
    role: "Chief Data Officer",
    company: "NovaCorp Industries",
    industry: "Manufacturing",
    rating: 5,
    avatar: "SC",
    accentColor: 'primary',
  },
  {
    quote: "The cloud migration they engineered cut our infrastructure costs by 60% while tripling our system performance. Their team worked alongside ours seamlessly — true technical partners, not just vendors.",
    author: "Marcus Williams",
    role: "VP of Engineering",
    company: "Apex Financial",
    industry: "FinTech",
    rating: 5,
    avatar: "MW",
    accentColor: 'cyan',
  },
  {
    quote: "Their LLM-powered customer intelligence system is a game-changer. We went from analyzing 5% of support tickets to 100%, and customer satisfaction jumped 34 points in six months.",
    author: "Priya Patel",
    role: "CEO",
    company: "FlowCommerce",
    industry: "E-commerce",
    rating: 5,
    avatar: "PP",
    accentColor: 'accent',
  },
  {
    quote: "Best technical team we've ever worked with. They delivered our entire digital platform on time, under budget, and with zero critical bugs at launch. Extraordinary execution.",
    author: "James O'Brien",
    role: "CTO",
    company: "Meridian Health",
    industry: "Healthcare",
    rating: 5,
    avatar: "JO",
    accentColor: 'emerald',
  },
  {
    quote: "Digitech's security audit uncovered 47 critical vulnerabilities our internal team missed. Within 30 days they had us fully SOC 2 compliant. Absolute experts in their field.",
    author: "Anastasia Kovac",
    role: "CISO",
    company: "Vertex Capital",
    industry: "Finance",
    rating: 5,
    avatar: "AK",
    accentColor: 'rose',
  },
]

const colorMap = {
  primary: { icon: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20', avatar: 'from-primary-500 to-primary-700' },
  cyan: { icon: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', avatar: 'from-cyan-500 to-cyan-700' },
  accent: { icon: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/20', avatar: 'from-accent-500 to-accent-700' },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', avatar: 'from-emerald-500 to-emerald-700' },
  rose: { icon: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', avatar: 'from-rose-500 to-rose-700' },
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoplay])

  const go = (dir) => {
    setIsAutoplay(false)
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[active]
  const colors = colorMap[current.accentColor]

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-max">
        <div className="mb-16">
          <SectionHeader
            badge="Client Stories"
            title={<>Trusted by <span className="gradient-text">Industry Leaders</span></>}
            subtitle="Real results from real companies. Here's what our partners say about working with Digitech."
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
            >
              <div className={`glass rounded-3xl p-8 md:p-12 border ${colors.border} relative overflow-hidden`}>
                {/* Background quote */}
                <div className="absolute top-6 right-8 opacity-5">
                  <Quote size={100} className="text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-light mb-10 italic">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.avatar} flex items-center justify-center font-syne font-bold text-white text-sm shadow-glow-sm`}>
                      {current.avatar}
                    </div>
                    <div>
                      <p className="font-syne font-semibold text-white text-lg">{current.author}</p>
                      <p className="text-gray-400 text-sm">{current.role} · {current.company}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-syne px-3 py-1.5 rounded-full ${colors.bg} ${colors.icon} border ${colors.border}`}>
                    {current.industry}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoplay(false); setActive(i) }}
                  className={`transition-all duration-300 rounded-full ${
                    i === active
                      ? 'w-8 h-2 bg-primary-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
