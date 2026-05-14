import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export default function Card({
  children,
  className = '',
  hover = true,
  glow = true,
  gradient = false,
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
      className={clsx(
        'glass rounded-2xl relative overflow-hidden transition-all duration-500',
        hover && 'cursor-pointer',
        glow && hover && 'hover:border-primary-500/30',
        gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary-500/5 before:to-accent-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500',
        className
      )}
      style={hover ? {
        boxShadow: undefined,
      } : undefined}
      {...props}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.3)' }} />
      )}
      {children}
    </motion.div>
  )
}
