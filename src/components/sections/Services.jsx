import { motion } from 'framer-motion'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import {
  Brain, Cloud, BarChart3, Shield, Code2, Cpu,
  ArrowRight, Zap, Database, Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionHeader from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Custom AI models, NLP pipelines, computer vision, and predictive analytics built to solve your most complex business challenges.',
    gradient: 'from-primary-500/20 to-accent-500/10',
    iconColor: 'text-primary-400',
    iconBg: 'bg-primary-500/10',
    tags: ['LLM Fine-tuning', 'MLOps', 'RAG Systems'],
    href: '/services#ai',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Enterprise-grade cloud infrastructure on AWS, Azure, and GCP. Multi-cloud strategies, microservices, and serverless architectures.',
    gradient: 'from-cyan-500/20 to-primary-500/10',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
    href: '/services#cloud',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    description: 'Transform raw data into actionable intelligence. Real-time dashboards, data pipelines, and BI platforms that drive decisions.',
    gradient: 'from-accent-500/20 to-primary-500/10',
    iconColor: 'text-accent-400',
    iconBg: 'bg-accent-500/10',
    tags: ['Real-time ETL', 'Power BI', 'Data Lake'],
    href: '/services#data',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Zero-trust architecture, penetration testing, compliance automation, and 24/7 threat intelligence monitoring.',
    gradient: 'from-emerald-500/20 to-cyan-500/10',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    tags: ['Zero Trust', 'SOC 2', 'SIEM'],
    href: '/services#security',
  },
  {
    icon: Code2,
    title: 'Product Development',
    description: 'Full-cycle product engineering — from MVP to enterprise scale. React, Node.js, Python, mobile, and beyond.',
    gradient: 'from-amber-500/20 to-primary-500/10',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    tags: ['React', 'Node.js', 'Mobile'],
    href: '/services#product',
  },
  {
    icon: Cpu,
    title: 'Digital Transformation',
    description: 'End-to-end transformation consulting, legacy modernization, and technology strategy for enterprises ready to evolve.',
    gradient: 'from-rose-500/20 to-accent-500/10',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    tags: ['Strategy', 'Automation', 'Integration'],
    href: '/services#digital',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 1.11, 0.81, 0.99] },
  },
}

export default function Services() {
  return (
    <section className="section-padding relative overflow-hidden" id="services">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-max relative">
        <div className="mb-16">
          <SectionHeader
            badge="Our Capabilities"
            title={<>What We <span className="gradient-text">Build</span> For You</>}
            subtitle="Six core disciplines, one unified mission: turning your boldest technology ambitions into production-grade reality."
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Link to={service.href}>
                  <div className="glass rounded-2xl p-6 h-full group hover:border-white/20 transition-all duration-500 cursor-pointer relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} className={service.iconColor} />
                      </div>

                      <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {service.tags.map((tag) => (
                          <span key={tag} className="text-xs font-syne px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 text-sm font-medium ${service.iconColor} font-syne`}>
                        Learn more
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
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
