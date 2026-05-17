import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function ModalBase({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(2,5,16,0.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl flex flex-col rounded-3xl"
            style={{
              background: 'linear-gradient(160deg, #0a0f22 0%, #0d1432 100%)',
              border: '1px solid rgba(108,99,255,0.3)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(108,99,255,0.08)',
              maxHeight: '90vh',
            }}
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div
              className="flex items-center justify-between px-8 pt-7 pb-5 shrink-0 rounded-t-3xl"
              style={{
                background: 'linear-gradient(160deg, #0a0f22 0%, #0d1432 100%)',
                borderBottom: title ? '1px solid rgba(255,255,255,0.06)' : 'none',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <h2 className="font-syne font-bold text-white text-2xl">{title}</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Scrollable body */}
            <div
              className="overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(108,99,255,0.3) transparent',
              }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
