import { motion } from 'framer-motion'
import Badge from './Badge'
import { useThemeStore } from '../../store/themeStore'

export default function SectionHeader({ badge, title, subtitle, centered = true }) {
  const { isDark } = useThemeStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
      className={centered ? 'text-center' : ''}
    >
      {badge && (
        <Badge variant="default" animate className="mb-4">
          {badge}
        </Badge>
      )}
      <h2
        className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
        style={{ color: 'var(--text-primary)', transition: 'color 0.3s ease' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
