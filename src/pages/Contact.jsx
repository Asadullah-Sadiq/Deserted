import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Clock, Send, Calendar, Rocket, Handshake } from 'lucide-react'
import { contactSchema } from '../lib/validators'
import { sendContactEmail } from '../lib/email'
import { useModalStore } from '../store/modalStore'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import SEO from '../components/ui/SEO'

const services = [
  'AI & Machine Learning',
  'Cloud Architecture',
  'Data & Analytics',
  'Cybersecurity',
  'Product Development',
  'Digital Transformation',
  'General Inquiry',
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@digitechofferings.com',
    href: 'mailto:hello@digitechofferings.com',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 000-0000',
    href: 'tel:+15550000000',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: MapPin,
    label: 'Offices',
    value: 'San Francisco · New York · London',
    href: null,
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours, typically same day',
    href: null,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
]

const getStartedOptions = [
  {
    key: 'project',
    icon: Rocket,
    label: 'Start a Project',
    description: 'Have an idea or need to build something? Tell us what you\'re working on.',
    gradient: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
    glow: 'rgba(108,99,255,0.45)',
    border: 'rgba(108,99,255,0.3)',
    hoverBorder: '#6C63FF',
  },
  {
    key: 'call',
    icon: Calendar,
    label: 'Book a Call',
    description: 'Prefer to talk first? Schedule a 30-min discovery call with our team.',
    gradient: 'linear-gradient(135deg, #00D4FF, #00E5A0)',
    glow: 'rgba(0,212,255,0.45)',
    border: 'rgba(0,212,255,0.3)',
    hoverBorder: '#00D4FF',
  },
  {
    key: 'partner',
    icon: Handshake,
    label: 'Partnership',
    description: 'Looking to partner or collaborate? Let\'s explore what we can build together.',
    gradient: 'linear-gradient(135deg, #FF6B9D, #6C63FF)',
    glow: 'rgba(255,107,157,0.45)',
    border: 'rgba(255,107,157,0.3)',
    hoverBorder: '#FF6B9D',
  },
]

function GetStartedCard({ option, onOpen }) {
  const Icon = option.icon

  return (
    <motion.button
      onClick={() => onOpen(option.key)}
      whileHover={{ y: -6, boxShadow: `0 20px 60px ${option.glow}` }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left flex flex-col gap-4 p-7 rounded-2xl transition-all duration-300"
      style={{
        background: 'rgba(13,18,40,0.7)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${option.border}`,
        cursor: 'pointer',
      }}
      aria-label={`Open ${option.label} form`}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: option.gradient, boxShadow: `0 0 28px ${option.glow}` }}
      >
        <Icon size={24} color="#fff" />
      </div>

      <div>
        <h3
          className="font-syne font-bold text-white mb-2"
          style={{ fontSize: '18px' }}
        >
          {option.label}
        </h3>
        <p className="text-gray-400 leading-relaxed" style={{ fontSize: '14px' }}>
          {option.description}
        </p>
      </div>

      <div
        className="flex items-center gap-2 font-syne font-semibold text-sm mt-auto"
        style={{
          background: option.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Get Started →
      </div>
    </motion.button>
  )
}

export default function Contact() {
  const openModal = useModalStore((s) => s.openModal)

  useEffect(() => {
    document.title = 'Contact | Digitech Offerings'
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data) => {
    try {
      await sendContactEmail(data)
      toast.success("Message sent! We'll be in touch within 24 hours.", {
        duration: 5000,
        style: {
          background: '#0d1424',
          color: '#f9fafb',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '12px',
        },
      })
      reset()
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.', {
        style: {
          background: '#0d1424',
          color: '#f9fafb',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '12px',
        },
      })
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="pt-20"
    >
      <SEO
        title="Contact Us"
        path="/contact"
        description="Get in touch with Digitech Offerings. Start a project, schedule a call, or send us an enquiry — we respond within 24 hours."
      />

      {/* ── Get Started Section ─────────────────────── */}
      <section className="section-padding relative overflow-hidden pb-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="container-max relative">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-syne font-semibold mb-4"
              style={{
                fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              How Can We Help?
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-syne font-bold text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1 }}
            >
              Let's Build{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Something
              </span>{' '}
              Together
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed"
              style={{ fontSize: '17px' }}
            >
              Choose how you'd like to get in touch — we respond with a clear path forward, no sales fluff.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-0"
          >
            {getStartedOptions.map((opt) => (
              <GetStartedCard key={opt.key} option={opt} onOpen={openModal} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────── */}
      <div className="container-max px-6">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.2))' }} />
            <span className="font-syne text-xs font-semibold text-gray-500 tracking-[0.2em] uppercase">Or send a message</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.2), transparent)' }} />
          </div>
        </div>
      </div>

      {/* ── Contact Form Section ───────────────────────── */}
      <section className="relative overflow-hidden pt-0 pb-24">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              <div className="glass rounded-2xl p-6 border border-primary-500/15">
                <h3 className="font-syne font-bold text-white text-lg mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                        <Icon size={16} className={color} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-syne mb-1">{label}</p>
                        {href ? (
                          <a href={href} className={`text-sm font-medium ${color} hover:opacity-80 transition-opacity`}>
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-300">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-emerald-500/15">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="text-emerald-400 text-sm font-syne font-medium">Currently Available</span>
                </div>
                <p className="text-gray-500 text-sm">
                  We're accepting new client engagements.{' '}
                  <span className="text-gray-300">Limited spots remain.</span>
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8 border border-white/8">
                <h2 className="font-syne font-bold text-white text-xl mb-8">Send us a message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name *"
                      placeholder="Jane Smith"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Work Email *"
                      type="email"
                      placeholder="jane@company.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Company"
                      placeholder="Acme Corp"
                      error={errors.company?.message}
                      {...register('company')}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 font-syne">
                      Service of Interest
                    </label>
                    <select
                      {...register('service')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-100 font-sans text-sm transition-all duration-300 outline-none focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <option value="" className="bg-[#0a0f22]">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#0a0f22]">{s}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-red-400" role="alert">{errors.service.message}</p>
                    )}
                  </div>

                  <Input
                    label="Message *"
                    placeholder="Tell us about your project, goals, and timeline..."
                    textarea
                    rows={5}
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full justify-center"
                      icon={<Send size={16} aria-hidden="true" />}
                    >
                      Send Message
                    </Button>
                  </div>

                  <p className="text-xs text-gray-600 text-center">
                    By submitting, you agree to our Privacy Policy. We never share your data.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
