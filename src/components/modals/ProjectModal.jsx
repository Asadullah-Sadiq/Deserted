import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { projectSchema } from '../../lib/validators'
import { checkDuplicate, saveSubmission } from '../../lib/firestore'
import { checkRateLimit, recordSubmission, isHoneypotFilled } from '../../lib/spam'
import ModalBase from './ModalBase'

const STEP_FIELDS = {
  1: ['firstName', 'lastName', 'email', 'company', 'role'],
  2: ['services', 'description', 'projectType'],
  3: ['budget', 'timeline'],
}

const ROLES         = ['CEO', 'CTO', 'Product Manager', 'Developer', 'Designer', 'Other']
const PROJECT_TYPES = ['MVP', 'Enhancement', 'Migration', 'Consulting', 'Retainer']
const HEAR_ABOUT    = ['Google Search', 'LinkedIn', 'Referral', 'Twitter/X', 'Conference', 'Other']
const SERVICE_CHIPS = ['AI/ML', 'Web Dev', 'Cloud', 'Mobile', 'Security', 'Data']
const BUDGETS       = ['$1K–$10K', '$10K–$25K', '$25K–$50K', '$50K–$100K', '$100K+']
const TIMELINES     = ['ASAP', '1–3 Months', '3–6 Months', 'Flexible']

const inputCls  = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-100 text-sm font-sans outline-none transition-all duration-200 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-gray-600'
const selectCls = inputCls + ' appearance-none'
const labelCls  = 'block text-xs font-syne font-medium text-gray-400 mb-1.5 uppercase tracking-wide'
const errCls    = 'mt-1 text-xs text-red-400'

const toastStyle = {
  style: { background: '#0a0f22', color: '#f9fafb', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px' },
}

function Field({ label, error, children }) {
  return (
    <div>
      {label && <label className={labelCls}>{label}</label>}
      {children}
      {error && <p className={errCls} role="alert">{error}</p>}
    </div>
  )
}

function StepIndicator({ step, total }) {
  return (
    <div className="px-8 pb-6">
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1
          const done   = n < step
          const active = n === step
          return (
            <div key={n} className="flex items-center gap-2">
              <motion.div
                animate={{
                  background: done || active ? 'linear-gradient(135deg,#6C63FF,#00D4FF)' : 'rgba(255,255,255,0.1)',
                  scale: active ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-syne font-bold text-white shrink-0"
              >
                {done ? <CheckCircle2 size={14} /> : n}
              </motion.div>
              {i < total - 1 && (
                <div className="flex-1 h-px w-16"
                  style={{ background: n < step ? 'linear-gradient(90deg,#6C63FF,#00D4FF)' : 'rgba(255,255,255,0.1)' }}
                />
              )}
            </div>
          )
        })}
        <span className="ml-auto text-xs text-gray-500 font-syne">Step {step} of {total}</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#6C63FF,#00D4FF)' }}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function SuccessState({ onClose }) {
  return (
    <div className="px-8 pb-10 flex flex-col items-center text-center gap-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', boxShadow: '0 0 40px rgba(108,99,255,0.5)' }}
      >
        <CheckCircle2 size={36} className="text-white" />
      </motion.div>
      <div>
        <h3 className="font-syne font-bold text-white text-2xl mb-2">Request Received!</h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
          We'll contact you within 24 hours to discuss your project. Check your inbox for a confirmation email.
        </p>
      </div>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="px-8 py-3 rounded-xl font-syne font-semibold text-white text-sm"
        style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}
      >Done</motion.button>
    </div>
  )
}

export default function ProjectModal({ isOpen, onClose }) {
  const [step, setStep]                     = useState(1)
  const [success, setSuccess]               = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [budget, setBudget]                 = useState('')
  const [timeline, setTimeline]             = useState('')

  const { register, handleSubmit, trigger, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: { services: [], budget: '', timeline: '', _hp: '' },
  })

  const handleClose = () => {
    onClose()
    setTimeout(() => { setStep(1); setSuccess(false); setSelectedServices([]); setBudget(''); setTimeline('') }, 300)
  }

  const toggleService = (s) => {
    const next = selectedServices.includes(s)
      ? selectedServices.filter(x => x !== s)
      : [...selectedServices, s]
    setSelectedServices(next)
    setValue('services', next, { shouldValidate: true })
  }

  const nextStep = async () => {
    const valid = await trigger(STEP_FIELDS[step])
    if (valid) setStep(s => s + 1)
  }

  const onSubmit = async (data) => {
    // Honeypot check
    if (isHoneypotFilled(data._hp)) return

    // Rate limiting
    const rl = checkRateLimit('project')
    if (rl.blocked) {
      toast.error(`Please wait ${rl.minutesLeft} min before submitting again.`, toastStyle)
      return
    }

    try {
      const isDupe = await checkDuplicate('project_requests', data.email)
      if (isDupe) {
        toast.error("We already have a request from this email. We'll be in touch soon!", toastStyle)
        return
      }
      const { _hp, ...formData } = data
      await saveSubmission('project_requests', formData)
      await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      recordSubmission('project')
      setSuccess(true)
    } catch {
      toast.error('Something went wrong. Please try again.', toastStyle)
    }
  }

  return (
    <ModalBase isOpen={isOpen} onClose={handleClose} title={success ? '' : 'Start a Project'}>
      {success ? (
        <SuccessState onClose={handleClose} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Honeypot — hidden from real users, traps bots */}
          <input
            {...register('_hp')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <StepIndicator step={step} total={3} />

          <div className="px-8 pb-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }} className="space-y-4">
                  <p className="text-gray-400 text-sm mb-5">Tell us a bit about yourself.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name *" error={errors.firstName?.message}>
                      <input {...register('firstName')} placeholder="Jane" className={inputCls} />
                    </Field>
                    <Field label="Last Name *" error={errors.lastName?.message}>
                      <input {...register('lastName')} placeholder="Smith" className={inputCls} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Work Email *" error={errors.email?.message}>
                      <input {...register('email')} type="email" placeholder="jane@company.com" className={inputCls} />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <input {...register('phone')} type="tel" placeholder="+1 (555) 000-0000" className={inputCls} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Company *" error={errors.company?.message}>
                      <input {...register('company')} placeholder="Acme Corp" className={inputCls} />
                    </Field>
                    <Field label="Your Role *" error={errors.role?.message}>
                      <select {...register('role')} className={selectCls}>
                        <option value="" className="bg-[#0a0f22]">Select role…</option>
                        {ROLES.map(r => <option key={r} value={r} className="bg-[#0a0f22]">{r}</option>)}
                      </select>
                    </Field>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }} className="space-y-5">
                  <p className="text-gray-400 text-sm mb-1">Tell us about your project.</p>
                  <Field label="Services Needed *" error={errors.services?.message}>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SERVICE_CHIPS.map(s => (
                        <motion.button key={s} type="button" onClick={() => toggleService(s)}
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          className="px-4 py-2 rounded-xl text-sm font-syne font-medium transition-all duration-200"
                          style={selectedServices.includes(s)
                            ? { background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', color: '#fff', border: '1px solid transparent' }
                            : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}
                        >{s}</motion.button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Project Type *" error={errors.projectType?.message}>
                    <select {...register('projectType')} className={selectCls}>
                      <option value="" className="bg-[#0a0f22]">Select type…</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t} className="bg-[#0a0f22]">{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Project Description *" error={errors.description?.message}>
                    <textarea {...register('description')} rows={4} placeholder="Tell us about your project, goals, and challenges…" className={inputCls} />
                  </Field>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }} className="space-y-6">
                  <p className="text-gray-400 text-sm mb-1">Almost done — budget and timeline.</p>
                  <Field label="Budget Range *" error={errors.budget?.message}>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                      {BUDGETS.map(b => (
                        <motion.button key={b} type="button"
                          onClick={() => { setBudget(b); setValue('budget', b, { shouldValidate: true }) }}
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          className="py-3 px-2 rounded-xl text-xs font-syne font-medium text-center transition-all duration-200"
                          style={budget === b
                            ? { background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', color: '#fff', border: '1px solid transparent' }
                            : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}
                        >{b}</motion.button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Timeline *" error={errors.timeline?.message}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                      {TIMELINES.map(t => (
                        <motion.button key={t} type="button"
                          onClick={() => { setTimeline(t); setValue('timeline', t, { shouldValidate: true }) }}
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          className="py-3 px-2 rounded-xl text-xs font-syne font-medium text-center transition-all duration-200"
                          style={timeline === t
                            ? { background: 'linear-gradient(135deg,#6C63FF,#FF6B9D)', color: '#fff', border: '1px solid transparent' }
                            : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}
                        >{t}</motion.button>
                      ))}
                    </div>
                  </Field>
                  <Field label="How did you hear about us?">
                    <select {...register('hearAbout')} className={selectCls}>
                      <option value="" className="bg-[#0a0f22]">Select…</option>
                      {HEAR_ABOUT.map(h => <option key={h} value={h} className="bg-[#0a0f22]">{h}</option>)}
                    </select>
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <motion.button type="button" onClick={() => setStep(s => s - 1)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-syne font-medium text-gray-400 hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <ChevronLeft size={16} /> Back
              </motion.button>

              {step < 3 ? (
                <motion.button type="button" onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-syne font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >
                  Continue <ChevronRight size={16} />
                </motion.button>
              ) : (
                <motion.button type="submit" disabled={isSubmitting}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-syne font-semibold text-white disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                >
                  {isSubmitting ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <>Submit Request <ChevronRight size={16} /></>}
                </motion.button>
              )}
            </div>
          </div>
        </form>
      )}
    </ModalBase>
  )
}
