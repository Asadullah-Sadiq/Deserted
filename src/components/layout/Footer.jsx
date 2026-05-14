import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Twitter, Linkedin, Github, Mail, ArrowUpRight, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'AI Development', href: '/services#ai' },
    { label: 'Cloud Architecture', href: '/services#cloud' },
    { label: 'Data Analytics', href: '/services#data' },
    { label: 'Cybersecurity', href: '/services#security' },
    { label: 'Digital Transformation', href: '/services#digital' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/about#process' },
    { label: 'Case Studies', href: '/about#cases' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@digitechofferings.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-800" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary-500/50 to-transparent" />

      <div className="relative container-max section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-sm">
                <Zap size={18} className="text-white" />
              </div>
              <span className="font-syne font-bold text-xl text-white">
                Digi<span className="gradient-text">tech</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Engineering tomorrow's enterprise with AI, cloud, and data intelligence. 
              Your trusted partner in digital transformation.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <MapPin size={14} className="text-primary-400 shrink-0" />
                <span>San Francisco, CA & New York, NY</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Phone size={14} className="text-primary-400 shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Mail size={14} className="text-primary-400 shrink-0" />
                <a href="mailto:hello@digitechofferings.com" className="hover:text-primary-400 transition-colors">
                  hello@digitechofferings.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-syne font-semibold text-white text-sm mb-5">{category}</h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {label}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glow-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Digitech Offerings. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Built with precision. Powered by innovation.
          </p>
        </div>
      </div>
    </footer>
  )
}
