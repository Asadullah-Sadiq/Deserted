import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowRight, Twitter, Linkedin, Github, Instagram } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isActive = (href) => {
    if (href.startsWith('/#')) return false
    return location.pathname === href
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
          background: scrolled
            ? isDark
              ? 'rgba(5,8,22,0.85)'
              : 'rgba(240,242,255,0.92)'
            : 'transparent',
          borderBottom: scrolled
            ? isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.06)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? isDark
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(108,99,255,0.1)'
            : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: scrolled ? 60 : 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'height 0.3s ease',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <motion.div
              animate={{ scale: scrolled ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 8px rgba(108,99,255,0.6)',
                    '0 0 20px rgba(0,212,255,0.8)',
                    '0 0 8px rgba(108,99,255,0.6)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: 18, lineHeight: 1 }}
                >
                  ⚡
                </motion.span>
              </motion.div>

              <div style={{ lineHeight: 1 }}>
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: 20,
                    background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Digitech
                </span>
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 13,
                    color: isDark ? 'rgba(240,240,255,0.5)' : 'rgba(13,15,38,0.5)',
                    display: 'block',
                    marginTop: -2,
                  }}
                >
                  Offerings
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} isActive={isActive(link.href)} isDark={isDark} />
            ))}
          </nav>

          {/* Right side — desktop only */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 12 }}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <ShimmerButton />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: 8 }}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '8px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDark ? '#F0F0FF' : '#0D0F26',
              }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            links={navLinks}
            social={socialLinks}
            isDark={isDark}
            onClose={() => setIsOpen(false)}
            location={location}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ link, isActive, isDark }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '6px 14px',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 500,
        fontSize: 15,
        textDecoration: 'none',
        color: isActive
          ? 'transparent'
          : hovered
          ? isDark ? '#F0F0FF' : '#0D0F26'
          : isDark ? 'rgba(240,240,255,0.55)' : 'rgba(13,15,38,0.55)',
        background: isActive
          ? 'linear-gradient(135deg, #6C63FF, #00D4FF)'
          : 'none',
        WebkitBackgroundClip: isActive ? 'text' : 'unset',
        WebkitTextFillColor: isActive ? 'transparent' : 'unset',
        backgroundClip: isActive ? 'text' : 'unset',
        transition: 'color 0.25s ease',
        borderRadius: 8,
      }}
    >
      {link.label}

      {/* Slide-in underline */}
      <motion.span
        initial={false}
        animate={{ scaleX: hovered || isActive ? 1 : 0, opacity: hovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 2,
          left: 14,
          right: 14,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
          transformOrigin: 'left',
        }}
      />
    </Link>
  )
}

function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <Sun size={17} color="#F59E0B" strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <Moon size={17} color="#6C63FF" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function ShimmerButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '9px 22px',
        borderRadius: 10,
        background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 600,
        fontSize: 14,
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 0 24px rgba(108,99,255,0.5)'
          : '0 4px 14px rgba(108,99,255,0.3)',
        transition: 'box-shadow 0.3s ease',
        userSelect: 'none',
      }}
    >
      {/* Shimmer sweep */}
      <motion.div
        animate={hovered ? { x: ['−100%', '200%'] } : { x: '-100%' }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      Get Started
      <ArrowRight size={14} />
    </motion.div>
  )
}

function MobileMenu({ links, social, isDark, onClose, location }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 49,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,8,22,0.6)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Panel slides from right */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 420,
          background: isDark ? '#050816' : '#F8F9FF',
          borderLeft: '1px solid rgba(108,99,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 40px 48px',
          overflowY: 'auto',
        }}
      >
        {/* Nav Links */}
        <nav style={{ flex: 1 }}>
          {links.map((link, i) => {
            const active = location.pathname === link.href
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: i * 0.07 + 0.05, duration: 0.35, ease: 'easeOut' }}
              >
                <Link
                  to={link.href}
                  onClick={onClose}
                  style={{
                    display: 'block',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: 36,
                    lineHeight: 1.15,
                    textDecoration: 'none',
                    marginBottom: 24,
                    background: active
                      ? 'linear-gradient(135deg, #6C63FF, #00D4FF)'
                      : 'none',
                    WebkitBackgroundClip: active ? 'text' : 'unset',
                    WebkitTextFillColor: active
                      ? 'transparent'
                      : isDark ? 'rgba(240,240,255,0.85)' : 'rgba(13,15,38,0.85)',
                    backgroundClip: active ? 'text' : 'unset',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.32, duration: 0.35 }}
          style={{ marginBottom: 40 }}
        >
          <Link to="/contact" onClick={onClose} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '14px 28px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              Get Started <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(0,212,255,0.3), transparent)',
            marginBottom: 28,
          }}
        />

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.3 }}
          style={{ display: 'flex', gap: 16 }}
        >
          {social.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1px solid rgba(108,99,255,0.2)',
                background: 'rgba(108,99,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDark ? 'rgba(240,240,255,0.6)' : 'rgba(13,15,38,0.6)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
