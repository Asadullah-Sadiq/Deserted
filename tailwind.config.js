/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        sans:  ['DM Sans', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(48px,8vw,96px)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h2':      ['clamp(36px,5vw,64px)',  { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '800' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
      },
      colors: {
        /* ── brand palette ── */
        primary: {
          DEFAULT: '#6C63FF',
          50:  '#f0efff',
          100: '#e2e0ff',
          200: '#c5c1ff',
          300: '#a89fff',
          400: '#8b7fff',
          500: '#6C63FF',
          600: '#5248e0',
          700: '#3d35c0',
          800: '#2a249f',
          900: '#1a1580',
          950: '#0d0a5c',
        },
        secondary: {
          DEFAULT: '#00D4FF',
          400: '#4de3ff',
          500: '#00D4FF',
          600: '#00afd4',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          400: '#ff9494',
          500: '#FF6B6B',
          600: '#e04f4f',
        },
        success: {
          DEFAULT: '#00E5A0',
          400: '#33edba',
          500: '#00E5A0',
          600: '#00c285',
        },
        /* ── surfaces ── */
        dark: {
          950: '#050816',
          900: '#0D0F26',
          800: '#111432',
          700: '#161940',
          600: '#1c2050',
          500: '#252a6a',
          400: '#374151',
          300: '#8B8BA7',
        },
      },
      backgroundImage: {
        'gradient-1':    'linear-gradient(135deg, #6C63FF, #00D4FF)',
        'gradient-2':    'linear-gradient(135deg, #FF6B6B, #FFD93D)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #050816 0%, #0D0F26 50%, #111432 100%)',
        'glow-primary':  'radial-gradient(ellipse at center, rgba(108,99,255,0.18) 0%, transparent 70%)',
        'glow-secondary':'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)',
      },
      borderRadius: {
        card:   '24px',
        btn:    '12px',
        input:  '10px',
        chip:   '999px',
      },
      boxShadow: {
        'card':        '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'btn':         '0 4px 24px rgba(108,99,255,0.4)',
        'glow':        '0 0 80px rgba(108,99,255,0.2)',
        'glow-sm':     '0 0 40px rgba(108,99,255,0.4)',
        'glow-secondary': '0 0 40px rgba(0,212,255,0.4)',
        'glass':       '0 8px 32px 0 rgba(0,0,0,0.37)',
        'glow-lg':     '0 0 80px rgba(108,99,255,0.3)',
        'glow-accent': '0 0 40px rgba(255,107,107,0.4)',
      },
      spacing: {
        1:   '4px',
        2:   '8px',
        3:   '12px',
        4:   '16px',
        6:   '24px',
        8:   '32px',
        12:  '48px',
        16:  '64px',
        24:  '96px',
        32:  '128px',
        48:  '192px',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':   'spin 20s linear infinite',
        'gradient-x':  'gradient-x 15s ease infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'glow':        'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%':     { 'background-position': '100% 50%' },
        },
        shimmer: {
          '0%':   { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        glow: {
          '0%':   { 'box-shadow': '0 0 20px rgba(108,99,255,0.3)' },
          '100%': { 'box-shadow': '0 0 60px rgba(108,99,255,0.6), 0 0 100px rgba(108,99,255,0.2)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
