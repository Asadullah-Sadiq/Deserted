import { motion } from 'framer-motion'
import Badge from './Badge'

export default function SectionHeader({ badge, title, subtitle, centered = true, light = false }) {
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
      <h2 className={`font-syne font-bold text-4xl md:text-5xl lg:text-6xl leading-tight ${light ? 'text-gray-900' : 'text-white'} mb-6`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
