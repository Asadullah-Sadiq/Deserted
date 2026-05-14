import { clsx } from 'clsx'
import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  textarea = false,
  rows = 4,
  ...props
}, ref) => {
  const baseStyles = clsx(
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500',
    'transition-all duration-300 outline-none font-sans text-sm',
    'focus:bg-white/8 focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20',
    error ? 'border-red-500/60' : 'border-white/10',
    icon && 'pl-11',
    className
  )

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-2 font-syne">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        {textarea ? (
          <textarea
            ref={ref}
            rows={rows}
            className={clsx(baseStyles, 'resize-none')}
            style={{ top: 'auto' }}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            className={baseStyles}
            {...props}
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
