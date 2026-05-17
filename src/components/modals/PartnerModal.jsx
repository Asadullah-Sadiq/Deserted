import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { partnerSchema } from '../../lib/validators'
import { checkDuplicate, saveSubmission } from '../../lib/firestore'
import { checkRateLimit, recordSubmission, isHoneypotFilled } from '../../lib/spam'
import ModalBase from './ModalBase'

const PARTNER_TYPES  = ['Technology Partner', 'Reseller / Agency', 'System Integrator', 'Strategic Alliance', 'Investor', 'Other']
const COMPANY_SIZES  = ['1–10', '11–50', '51–200', '201–500', '500–1000', '1000+']

const inputCls  = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-100 text-sm font-sans outline-none transition-all duration-200 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/20 placeholder:text-gray-600'
const selectCls = inputCls + ' appearance-none'
const labelCls  = 'block text-xs font-syne font-medium text-gray-400 mb-1.5 uppercase tracking-wide'
const errCls    = 'mt-1 text-xs text-red-400'

const toastStyle = {
  style: { background: '#0a0f22', color: '#f9fafb', border: '1px solid rgba(255,107,157,0.3)', borderRadius: '12px' },
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
        style={{ background: 'linear-gradient(135deg,#FF6B9D,#6C63FF)', boxShadow: '0 0 40px rgba(255,107,157,0.45)' }}
      >
        <CheckCircle2 size={36} className="text-white" />
      </motion.div>
      <div>
        <h3 className="font-syne font-bold text-white text-2xl mb-2">Proposal Received!</h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
          Our partnerships team will review your proposal and reach out within 24–48 hours.
        </p>
      </div>
      <motion.button onClick={onClose} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="px-8 py-3 rounded-xl font-syne font-semibold text-white text-sm"
        style={{ background: 'linear-gradient(135deg,#FF6B9D,#6C63FF)' }}
      >Done</motion.button>
    </div>
  )
}

export default function PartnerModal({ isOpen, onClose }) {
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(partnerSchema),
    defaultValues: { _hp: '' },
  })

  const handleClose = () => { onClose(); setTimeout(() => { setSuccess(false); reset() }, 300) }

  const onSubmit = async (data) => {
    if (isHoneypotFilled(data._hp)) return

    const rl = checkRateLimit('partner')
    if (rl.blocked) {
      toast.error(`Please wait ${rl.minutesLeft} min before submitting again.`, toastStyle)
      return
    }

    try {
      const isDupe = await checkDuplicate('partnerships', data.email)
      if (isDupe) {
        toast.error('We already have a partnership inquiry from this email.', toastStyle)
        return
      }
      const { _hp, ...formData } = data
      await saveSubmission('partnerships', formData)
      await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      recordSubmission('partner')
      setSuccess(true)
    } catch {
      toast.error('Something went wrong. Please try again.', toastStyle)
    }
  }

  return (
    <ModalBase isOpen={isOpen} onClose={handleClose} title={success ? '' : 'Partnership Inquiry'}>
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

          <p className="text-gray-400 text-sm mb-5 -mt-2">Interested in partnering with Digitech? Tell us about your company.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your Name *" error={errors.name?.message}>
              <input {...register('name')} placeholder="Jane Smith" className={inputCls} />
            </Field>
            <Field label="Work Email *" error={errors.email?.message}>
              <input {...register('email')} type="email" placeholder="jane@company.com" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company *" error={errors.company?.message}>
              <input {...register('company')} placeholder="Acme Corp" className={inputCls} />
            </Field>
            <Field label="Website" error={errors.website?.message}>
              <input {...register('website')} placeholder="https://acme.com" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Partnership Type *" error={errors.partnershipType?.message}>
              <select {...register('partnershipType')} className={selectCls}>
                <option value="" className="bg-[#0a0f22]">Select type…</option>
                {PARTNER_TYPES.map(t => <option key={t} value={t} className="bg-[#0a0f22]">{t}</option>)}
              </select>
            </Field>
            <Field label="Company Size" error={errors.companySize?.message}>
              <select {...register('companySize')} className={selectCls}>
                <option value="" className="bg-[#0a0f22]">Select size…</option>
                {COMPANY_SIZES.map(s => <option key={s} value={s} className="bg-[#0a0f22]">{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Your Proposal *" error={errors.proposal?.message}>
            <textarea {...register('proposal')} rows={5}
              placeholder="Describe how you envision working with Digitech, the value you bring, and your goals…"
              className={inputCls} />
          </Field>

          <motion.button type="submit" disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-syne font-semibold text-white text-sm mt-2 disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg,#FF6B9D,#6C63FF)' }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
          >
            {isSubmitting ? <><Loader2 size={15} className="animate-spin" /> Submitting…</> : 'Submit Proposal'}
          </motion.button>
        </form>
      )}
    </ModalBase>
  )
}
