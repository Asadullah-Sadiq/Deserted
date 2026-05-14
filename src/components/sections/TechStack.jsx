import { motion } from 'framer-motion'

const technologies = [
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'PyTorch', category: 'AI/ML' },
  { name: 'OpenAI', category: 'AI/ML' },
  { name: 'LangChain', category: 'AI/ML' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Kubernetes', category: 'Infra' },
  { name: 'Terraform', category: 'Infra' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Data' },
  { name: 'Snowflake', category: 'Data' },
  { name: 'Apache Kafka', category: 'Data' },
  { name: 'Spark', category: 'Data' },
]

const duplicated = [...technologies, ...technologies]

export default function TechStack() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900" />

      <div className="container-max mb-10 text-center relative">
        <p className="text-gray-600 font-syne text-sm tracking-widest uppercase">
          Expertise Across the Full Modern Stack
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-dark-900 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-dark-900 to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicated.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="glass rounded-xl px-5 py-3 flex items-center gap-3 shrink-0 hover:border-primary-500/30 transition-colors duration-300 group cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-primary-500/60 group-hover:bg-primary-400 transition-colors" />
              <span className="font-syne font-medium text-gray-300 text-sm whitespace-nowrap group-hover:text-white transition-colors">
                {tech.name}
              </span>
              <span className="text-xs text-gray-600 font-sans">{tech.category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
