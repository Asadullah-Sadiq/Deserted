import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Stats from '../components/sections/Stats'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'
import TechStack from '../components/sections/TechStack'
import { motion } from 'framer-motion'
import SEO from '../components/ui/SEO'

export default function Home() {

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      <SEO
        path="/"
        description="World-class B2B AI & technology services. We engineer the future with cutting-edge AI solutions, cloud architecture, and digital transformation."
      />
      <Hero />
      <TechStack />
      <Services />
      <Stats />
      <Testimonials />
      <CTA />
    </motion.main>
  )
}
