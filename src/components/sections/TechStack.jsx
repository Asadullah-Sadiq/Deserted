import { motion } from 'framer-motion'

const technologies = [
  { name: 'TensorFlow', category: 'AI/ML', logo: 'https://cdn.simpleicons.org/tensorflow' },
  { name: 'PyTorch', category: 'AI/ML', logo: 'https://cdn.simpleicons.org/pytorch' },
  { name: 'OpenAI', category: 'AI/ML', logo: null },
  { name: 'LangChain', category: 'AI/ML', logo: 'https://cdn.simpleicons.org/langchain' },
  { name: 'AWS', category: 'Cloud', logo: null },
  { name: 'Azure', category: 'Cloud', logo: null },
  { name: 'GCP', category: 'Cloud', logo: 'https://cdn.simpleicons.org/googlecloud' },
  { name: 'Kubernetes', category: 'Infra', logo: 'https://cdn.simpleicons.org/kubernetes' },
  { name: 'Terraform', category: 'Infra', logo: 'https://cdn.simpleicons.org/terraform' },
  { name: 'React', category: 'Frontend', logo: 'https://cdn.simpleicons.org/react' },
  { name: 'Node.js', category: 'Backend', logo: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Python', category: 'Backend', logo: 'https://cdn.simpleicons.org/python' },
  { name: 'PostgreSQL', category: 'Data', logo: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Snowflake', category: 'Data', logo: 'https://cdn.simpleicons.org/snowflake' },
  { name: 'Apache Kafka', category: 'Data', logo: 'https://cdn.simpleicons.org/apachekafka' },
  { name: 'Apache Spark', category: 'Data', logo: 'https://cdn.simpleicons.org/apachespark' },
]

const duplicated = [...technologies, ...technologies]

const categoryColors = {
  'AI/ML':    'text-violet-400',
  'Cloud':    'text-cyan-400',
  'Infra':    'text-emerald-400',
  'Frontend': 'text-blue-400',
  'Backend':  'text-orange-400',
  'Data':     'text-pink-400',
}

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
          className="flex gap-3 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicated.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="glass rounded-xl px-4 py-3 flex items-center gap-3 shrink-0 hover:border-primary-500/30 transition-colors duration-300 group cursor-default"
            >
              {tech.logo ? (
                <img
                  src={tech.logo}
                  alt={tech.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.75 }}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-primary-500/60 group-hover:bg-primary-400 transition-colors" />
              )}
              <span className="font-syne font-medium text-gray-300 text-sm whitespace-nowrap group-hover:text-white transition-colors">
                {tech.name}
              </span>
              <span className={`text-xs font-sans ${categoryColors[tech.category] ?? 'text-gray-600'}`}>
                {tech.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
