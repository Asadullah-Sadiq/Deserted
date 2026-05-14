import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Stats from '../components/sections/Stats'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'
import TechStack from '../components/sections/TechStack'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.title = 'Digitech Offerings | B2B AI & Tech Services'
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <TechStack />
      <Services />
      <Stats />
      <Testimonials />
      <CTA />
    </motion.main>
  )
}
