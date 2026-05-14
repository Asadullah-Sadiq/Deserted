import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const variants = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  accent: 'relative inline-flex items-center justify-center gap-2 px-8 py-4 font-syne font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-accent-600 to-primary-600 hover:shadow-glow-accent hover:-translate-y-0.5',
  outline: 'relative inline-flex items-center justify-center gap-2 px-8 py-4 font-syne font-semibold rounded-xl border border-primary-500/50 text-primary-400 transition-all duration-300 hover:bg-primary-500/10 hover:border-primary-400',
  text: 'inline-flex items-center gap-2 font-syne font-medium text-primary-400 hover:text-primary-300 transition-colors duration-200',
}

const sizes = {
  sm: 'text-sm px-5 py-2.5',
  md: 'text-base',
  lg: 'text-lg px-10 py-5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </motion.button>
  )
}
