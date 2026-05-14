import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Brain, Cloud, BarChart3, Shield, Code2, Cpu,
  ArrowRight, CheckCircle2, Zap, Database, Globe, Lock
} from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CTA from '../components/sections/CTA'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    tagline: 'From pilot to production in weeks',
    description: 'We design and deploy AI systems that create measurable business value — not proof-of-concepts that never ship. Our ML engineers specialize in custom model development, fine-tuned LLMs, real-time inference pipelines, and enterprise AI platforms.',
    features: [
      'Custom LLM fine-tuning & RAG systems',
      'Computer vision & NLP pipelines',
      'Predictive analytics & forecasting models',
      'MLOps infrastructure & model monitoring',
      'AI-powered automation workflows',
      'Multimodal AI applications',
    ],
    gradient: 'from-primary-600/30 to-accent-600/20',
    borderColor: 'border-primary-500/30',
    iconBg: 'bg-primary-500/10',
    iconColor: 'text-primary-400',
    badge: 'Core Service',
    badgeVariant: 'default',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Architecture',
    tagline: 'Infrastructure that scales with your ambitions',
    description: "We architect cloud-native systems that are resilient, secure, and cost-optimized from day one. Whether you're migrating from on-premise, consolidating multi-cloud complexity, or building from scratch — we design the right foundation.",
    features: [
      'Multi-cloud strategy (AWS, Azure, GCP)',
      'Kubernetes orchestration & service mesh',
      'Serverless & event-driven architectures',
      'Infrastructure as Code with Terraform',
      'Cloud cost optimization & FinOps',
      'Disaster recovery & business continuity',
    ],
    gradient: 'from-cyan-600/30 to-primary-600/20',
    borderColor: 'border-cyan-500/30',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    badge: 'Popular',
    badgeVariant: 'cyan',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data & Analytics',
    tagline: 'Your data is your most valuable asset',
    description: 'We build the data infrastructure that makes your business intelligently data-driven — from ingestion to insight. Real-time pipelines, cloud data warehouses, self-serve BI platforms, and AI-enhanced analytics.',
    features: [
      'Real-time ETL & data pipeline engineering',
      'Cloud data warehouse (Snowflake, BigQuery)',
      'Business intelligence & dashboard design',
      'Data quality monitoring & governance',
      'Customer 360 & behavioral analytics',
      'Data mesh & lakehouse architectures',
    ],
    gradient: 'from-accent-600/30 to-primary-600/20',
    borderColor: 'border-accent-500/30',
    iconBg: 'bg-accent-500/10',
    iconColor: 'text-accent-400',
    badge: 'High ROI',
    badgeVariant: 'accent',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Cybersecurity',
    tagline: 'Security that enables, not just protects',
    description: 'Enterprise security from the ground up. We implement zero-trust architectures, automate compliance workflows, and provide continuous threat intelligence so your team can move fast without fear.',
    features: [
      'Zero-trust network architecture',
      'Penetration testing & red team exercises',
      'SOC 2, ISO 27001, HIPAA compliance',
      'SIEM & threat detection automation',
      'Identity & access management (IAM)',
      'Incident response planning & drills',
    ],
    gradient: 'from-emerald-600/30 to-cyan-600/20',
    borderColor: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    badge: 'Critical',
    badgeVariant: 'success',
  },
  {
    id: 'product',
    icon: Code2,
    title: 'Product Development',
    tagline: 'Ship products that users love',
    description: 'End-to-end product engineering from ideation to launch and scale. Our squads work as embedded partners — design, engineering, and QA — to build products that are fast, accessible, and genuinely delightful.',
    features: [
      'React, Next.js & modern frontend stacks',
      'Node.js, Python, Go backends',
      'iOS & Android mobile development',
      'API design & microservices architecture',
      'Performance optimization & accessibility',
      'CI/CD & DevOps automation',
    ],
    gradient: 'from-amber-600/30 to-primary-600/20',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    badge: 'Full-Cycle',
    badgeVariant: 'warning',
  },
  {
    id: 'digital',
    icon: Globe,
    title: 'Digital Transformation',
    tagline: 'Evolution, not disruption',
    description: 'Strategic transformation for organizations ready to modernize. We assess your current state, design your target architecture, and execute the transformation in phases — keeping you operational while we rebuild.',
    features: [
      'Technology strategy & roadmapping',
      'Legacy system modernization',
      'Process automation & workflow design',
      'Change management & team enablement',
      'API-first architecture transition',
      'Digital operating model design',
    ],
    gradient: 'from-rose-600/30 to-accent-600/20',
    borderColor: 'border-rose-500/30',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    badge: 'Strategic',
    badgeVariant: 'ghost',
  },
]

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Digitech Offerings'
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20"
    >
      {/* Page Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-max text-center max-w-4xl mx-auto">
          <SectionHeader
            badge="Enterprise Services"
            title={<>Six Disciplines. <span className="gradient-text">One Mission.</span></>}
            subtitle="Deep technical expertise across every layer of the modern technology stack. We partner with enterprises to build systems that last, scale, and create lasting competitive advantage."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link to="/contact">
              <Button size="lg" icon={<ArrowRight size={18} />}>
                Discuss Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="section-padding pt-0">
        <div className="container-max space-y-8">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
              >
                <div className={`glass rounded-3xl p-8 md:p-12 border ${service.borderColor} relative overflow-hidden group`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon size={26} className={service.iconColor} />
                        </div>
                        <div>
                          <Badge variant={service.badgeVariant} className="mb-2">
                            {service.badge}
                          </Badge>
                          <h2 className="font-syne font-bold text-3xl text-white">{service.title}</h2>
                        </div>
                      </div>

                      <p className={`font-syne font-medium text-lg mb-4 ${service.iconColor}`}>
                        {service.tagline}
                      </p>

                      <p className="text-gray-400 leading-relaxed text-base">
                        {service.description}
                      </p>

                      <div className="mt-8">
                        <Link to="/contact">
                          <Button variant="ghost" size="sm" className="text-sm px-5 py-2.5" icon={<ArrowRight size={14} />}>
                            Get a Quote
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <p className="font-syne font-semibold text-gray-300 text-sm uppercase tracking-wide mb-5">
                        What's included
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className={`${service.iconColor} mt-0.5 shrink-0`} />
                            <span className="text-gray-400 text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <CTA />
    </motion.main>
  )
}
