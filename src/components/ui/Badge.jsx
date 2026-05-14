import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export default function Badge({ children, variant = 'default', className = '', animate = false }) {
  const variants = {
    default: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    accent: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    ghost: 'bg-white/5 text-gray-300 border-white/10',
  }

  const Comp = animate ? motion.span : 'span'

  return (
    <Comp
      initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-syne border tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </Comp>
  )
}
