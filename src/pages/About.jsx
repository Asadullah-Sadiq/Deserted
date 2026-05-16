import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Target, Users, Lightbulb, Award, ArrowRight,
  CheckCircle2, TrendingUp, Globe, Clock, Heart
} from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CTA from '../components/sections/CTA'
import Stats from '../components/sections/Stats'

const values = [
  {
    icon: Target,
    title: 'Precision Engineering',
    description: "We obsess over technical quality. Every system we build is designed for reliability, performance, and long-term maintainability.",
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Relentless Innovation',
    description: 'We stay at the cutting edge so you don\'t have to. Our teams continuously evaluate and adopt technologies that give our clients the edge.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Users,
    title: 'True Partnership',
    description: 'We embed in your team, not just deliver from outside. Your success metrics are our success metrics — full stop.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Heart,
    title: 'Radical Transparency',
    description: 'No black boxes, no surprises. We communicate openly about challenges, timelines, and trade-offs at every stage.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
]

const team = [
  {
    name: 'Alexandra Torres',
    role: 'CEO & Co-Founder',
    bio: 'Former Google Brain researcher. 15 years building AI systems at scale.',
    avatar: 'AT',
    gradient: 'from-primary-500 to-accent-500',
  },
  {
    name: 'David Kim',
    role: 'CTO & Co-Founder',
    bio: 'Ex-AWS Principal Engineer. Architect of systems serving 100M+ users.',
    avatar: 'DK',
    gradient: 'from-cyan-500 to-primary-500',
  },
  {
    name: 'Nadia Osei',
    role: 'VP of AI Engineering',
    bio: 'PhD in ML from MIT. Led AI initiatives at three Fortune 500 companies.',
    avatar: 'NO',
    gradient: 'from-accent-500 to-rose-500',
  },
  {
    name: 'Rafael Mendez',
    role: 'Head of Cloud',
    bio: 'Kubernetes core contributor. Built cloud infra for $10B+ revenue companies.',
    avatar: 'RM',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    name: 'Sophie Laurent',
    role: 'Head of Product',
    bio: 'Former Head of Design at Stripe. Obsessively user-centric product thinker.',
    avatar: 'SL',
    gradient: 'from-amber-500 to-rose-500',
  },
  {
    name: 'James Park',
    role: 'Head of Security',
    bio: 'Former NSA analyst. Led security at two major financial institutions.',
    avatar: 'JP',
    gradient: 'from-primary-500 to-emerald-500',
  },
]

const process = [
  {
    step: '01',
    title: 'Discovery & Audit',
    description: 'Deep technical assessment of your current state, goals, constraints, and opportunities. We align before we build.',
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Architecture & Planning',
    description: 'Solution design, technical architecture, project roadmap, and team composition. Full transparency on scope and timeline.',
    duration: '1-2 weeks',
  },
  {
    step: '03',
    title: 'Build & Iterate',
    description: 'Agile delivery in 2-week sprints with regular demos. You see progress continuously — no big reveal at the end.',
    duration: 'Ongoing',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    description: 'Production deployment, team handoff, documentation, and ongoing optimization as your system grows.',
    duration: '1-4 weeks',
  },
]

export default function About() {
  useEffect(() => {
    document.title = 'About Us | Digitech Offerings'
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="pt-20"
    >
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <SectionHeader
              badge="Our Story"
              title={<>Engineering Excellence <span className="gradient-text">Since 2018</span></>}
              subtitle="We started with one belief: world-class technology should be accessible to every enterprise willing to invest in their future. Six years later, we've helped 200+ companies build the systems that define their competitive edge."
            />
          </div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8 md:p-12 border border-primary-500/20 relative overflow-hidden max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
            <div className="relative z-10 text-center">
              <p className="font-syne font-light text-2xl md:text-3xl text-gray-200 leading-relaxed italic">
                "Our mission is to be the technical partner that helps enterprises navigate the complexity of modern AI and cloud — delivering solutions that create lasting, measurable value."
              </p>
              <p className="mt-6 text-primary-400 font-syne font-semibold">— Alexandra Torres, CEO</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding pt-0" id="values">
        <div className="container-max">
          <div className="mb-14">
            <SectionHeader
              badge="Our Values"
              title={<>What We <span className="gradient-text">Stand For</span></>}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="glass rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-500 group">
                    <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={22} className={value.color} />
                    </div>
                    <h3 className="font-syne font-bold text-lg text-white mb-3">{value.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Stats />

      {/* Team */}
      <section className="section-padding" id="team">
        <div className="container-max">
          <div className="mb-14">
            <SectionHeader
              badge="Leadership"
              title={<>The <span className="gradient-text">People</span> Behind the Work</>}
              subtitle="Former engineers and researchers from Google, AWS, MIT, and NSA. Deeply technical, intensely curious."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-500 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center font-syne font-bold text-xl text-white mb-5 group-hover:scale-105 transition-transform duration-300 shadow-glow-sm`}>
                    {member.avatar}
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white mb-1">{member.name}</h3>
                  <p className="text-primary-400 text-sm font-medium mb-3 font-syne">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding pt-0" id="process">
        <div className="container-max">
          <div className="mb-14">
            <SectionHeader
              badge="How We Work"
              title={<>Our <span className="gradient-text">Delivery</span> Process</>}
              subtitle="Transparent, structured, and built around your success. No surprises, no black boxes."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px glow-line z-10" style={{ width: 'calc(100% - 2rem)', left: 'calc(100% - 1rem)' }} />
                )}
                <div className="glass rounded-2xl p-6 h-full hover:border-primary-500/20 transition-all duration-500">
                  <div className="font-syne font-extrabold text-5xl gradient-text-primary mb-4 leading-none">
                    {step.step}
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-primary-400" />
                    <span className="text-xs text-primary-400 font-syne">{step.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </motion.main>
  )
}
