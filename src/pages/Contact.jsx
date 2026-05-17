import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SEO from '../components/ui/SEO'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar } from 'lucide-react'
import { contactSchema } from '../lib/validators'
import { sendContactEmail } from '../lib/email'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'

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

export default function Contact() {
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
      toast.success('Message sent! We\'ll be in touch within 24 hours.', {
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
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-max">
          <div className="text-center mb-16">
            <SectionHeader
              badge="Get in Touch"
              title={<>Let's Build <span className="gradient-text">Something</span> Together</>}
              subtitle="Tell us about your project. We'll respond with a clear path forward — no sales fluff, just substance."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              <div className="glass rounded-2xl p-6 border border-primary-500/15">
                <h3 className="font-syne font-bold text-white text-lg mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                        <Icon size={16} className={color} />
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

              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-syne font-semibold text-white text-base mb-4">
                  Prefer to schedule directly?
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  Book a 30-minute technical discovery call with our solution architects.
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-center text-sm" icon={<Calendar size={14} />} iconPosition="left">
                  Book a Call
                </Button>
              </div>

              <div className="glass rounded-2xl p-6 border border-emerald-500/15">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-sm font-syne font-medium">Currently Available</span>
                </div>
                <p className="text-gray-500 text-sm">
                  We're accepting new client engagements starting Q1 2025. 
                  <span className="text-gray-300"> Limited spots remain.</span>
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
                <h3 className="font-syne font-bold text-white text-xl mb-8">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-100 font-sans text-sm transition-all duration-300 outline-none focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20 focus:bg-white/8"
                    >
                      <option value="" className="bg-dark-800">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-dark-800">{s}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.service.message}</p>
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
                      icon={<Send size={16} />}
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
