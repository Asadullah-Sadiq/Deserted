import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Twitter, Linkedin, Github, Instagram, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'

const services = [
  { label: 'AI & Machine Learning', href: '/services#ai' },
  { label: 'Web Development',       href: '/services#web' },
  { label: 'Cloud Infrastructure',  href: '/services#cloud' },
  { label: 'Mobile Development',    href: '/services#mobile' },
  { label: 'Cybersecurity',         href: '/services#security' },
  { label: 'Data & Analytics',      href: '/services#data' },
]

const company = [
  { label: 'About Us',     href: '/about' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Careers',      href: '/careers' },
  { label: 'Contact',      href: '/contact' },
]

const socials = [
  { icon: Github,    href: 'https://github.com',    label: 'GitHub',    color: '#f0f0ff' },
  { icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn',  color: '#0A66C2' },
  { icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter',   color: '#1DA1F2' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: '#E1306C' },
]

function FooterLink({ href, label }) {
  return (
    <li>
      <Link
        to={href}
        className="group flex items-center gap-1 text-gray-500 text-sm hover:text-gray-200 transition-colors duration-200"
      >
        {label}
        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </Link>
    </li>
  )
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#020510' }}
    >
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #6C63FF 30%, #00D4FF 60%, #FF6B9D 80%, transparent 100%)' }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.07) 0%, transparent 70%)' }} />

      <div className="container-max pt-16 pb-8 relative">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  boxShadow: '0 0 18px rgba(108,99,255,0.4)',
                }}
              >
                <Zap size={17} className="text-white" />
              </motion.div>
              <div>
                <span className="font-syne font-bold text-lg" style={{
                  background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Digitech
                </span>
                <span className="font-syne font-bold text-lg text-white"> Offerings</span>
              </div>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-7 max-w-[220px]">
              Engineering tomorrow's enterprise with AI, cloud, and data intelligence.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, color }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="font-syne font-semibold text-white text-sm mb-5 tracking-wide">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => <FooterLink key={s.label} {...s} />)}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="font-syne font-semibold text-white text-sm mb-5 tracking-wide">Company</h3>
            <ul className="space-y-3">
              {company.map((s) => <FooterLink key={s.label} {...s} />)}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-syne font-semibold text-white text-sm mb-5 tracking-wide">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#6C63FF' }} />
                <span>San Francisco, CA<br />New York, NY &amp; London</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={14} className="shrink-0" style={{ color: '#00D4FF' }} />
                <a href="mailto:hello@digitechofferings.com" className="text-gray-500 hover:text-gray-200 transition-colors">
                  hello@digitechofferings.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={14} className="shrink-0" style={{ color: '#00E5A0' }} />
                <a href="tel:+15550000000" className="text-gray-500 hover:text-gray-200 transition-colors">
                  +1 (555) 000-0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Digitech Offerings. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms"   className="hover:text-gray-400 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-gray-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
