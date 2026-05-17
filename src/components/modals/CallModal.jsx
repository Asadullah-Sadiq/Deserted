import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { callSchema } from '../../lib/validators'
import { checkDuplicate, saveSubmission } from '../../lib/firestore'
import { checkRateLimit, recordSubmission, isHoneypotFilled } from '../../lib/spam'
import ModalBase from './ModalBase'

const TOPICS = ['General Inquiry', 'Project Scoping', 'Pricing & Budget', 'Technical Consultation', 'Partnership', 'Other']

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

function SuccessState({ onClose }) {
  return (
    <div className="px-5 sm:px-8 pb-10 flex flex-col items-center text-center gap-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#00D4FF,#00E5A0)', boxShadow: '0 0 40px rgba(0,212,255,0.45)' }}
      >
        <CheckCircle2 size={36} className="text-white" />
      </motion.div>
      <div>
        <h3 className="font-syne font-bold text-white text-2xl mb-2">Call Scheduled!</h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
          We'll confirm your slot within 24 hours. A calendar invite will be sent to your email.
        </p>
      </div>
      <motion.button onClick={onClose} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="px-8 py-3 rounded-xl font-syne font-semibold text-white text-sm"
        style={{ background: 'linear-gradient(135deg,#00D4FF,#00E5A0)' }}
      >Done</motion.button>
    </div>
  )
}

export default function CallModal({ isOpen, onClose }) {
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(callSchema),
    defaultValues: { _hp: '' },
  })

  const handleClose = () => { onClose(); setTimeout(() => { setSuccess(false); reset() }, 300) }

  const onSubmit = async (data) => {
    if (isHoneypotFilled(data._hp)) return

    const rl = checkRateLimit('call')
    if (rl.blocked) {
      toast.error(`Please wait ${rl.minutesLeft} min before submitting again.`, toastStyle)
      return
    }

    try {
      const isDupe = await checkDuplicate('call_schedules', data.email)
      if (isDupe) {
        toast.error('We already have a call request from this email.', toastStyle)
        return
      }
      const { _hp, ...formData } = data
      await saveSubmission('call_schedules', formData)
      await fetch('/api/call-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      recordSubmission('call')
      setSuccess(true)
    } catch {
      toast.error('Something went wrong. Please try again.', toastStyle)
    }
  }

  return (
    <ModalBase isOpen={isOpen} onClose={handleClose} title={success ? '' : 'Schedule a Call'}>
      {success ? <SuccessState onClose={handleClose} /> : (
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 sm:px-8 pb-8 space-y-4">
          {/* Honeypot */}
          <input
            {...register('_hp')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <p className="text-gray-400 text-sm mb-5 -mt-2">Book a 30-minute discovery call with our team.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *" error={errors.fullName?.message}>
              <input {...register('fullName')} placeholder="Jane Smith" className={inputCls} />
            </Field>
            <Field label="Work Email *" error={errors.email?.message}>
              <input {...register('email')} type="email" placeholder="jane@company.com" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company" error={errors.company?.message}>
              <input {...register('company')} placeholder="Acme Corp" className={inputCls} />
            </Field>
            <Field label="Topic *" error={errors.topic?.message}>
              <select {...register('topic')} className={selectCls}>
                <option value="" className="bg-[#0a0f22]">Select topic…</option>
                {TOPICS.map(t => <option key={t} value={t} className="bg-[#0a0f22]">{t}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Preferred Date *" error={errors.preferredDate?.message}>
              <input {...register('preferredDate')} type="date" className={inputCls}
                min={new Date().toISOString().split('T')[0]} />
            </Field>
            <Field label="Preferred Time *" error={errors.preferredTime?.message}>
              <input {...register('preferredTime')} type="time" className={inputCls} />
            </Field>
          </div>

          <Field label="Notes" error={errors.notes?.message}>
            <textarea {...register('notes')} rows={3} placeholder="Anything specific you'd like to cover…" className={inputCls} />
          </Field>

          <motion.button type="submit" disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-syne font-semibold text-white text-sm mt-2 disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg,#00D4FF,#00E5A0)' }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          >
            {isSubmitting ? <><Loader2 size={15} className="animate-spin" /> Booking…</> : 'Book My Call'}
          </motion.button>
        </form>
      )}
    </ModalBase>
  )
}
