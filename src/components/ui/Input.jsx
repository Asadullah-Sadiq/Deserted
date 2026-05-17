import { clsx } from 'clsx'
import { forwardRef, useState, useId } from 'react'

const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  textarea = false,
  rows = 4,
  placeholder,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false)
  const id = useId()
  const hasValue = props.value !== undefined
    ? Boolean(props.value)
    : undefined

  const isFloated = focused || hasValue

  const baseStyles = clsx(
    'w-full bg-white/5 border rounded-xl px-4 text-gray-100 placeholder-transparent',
    'transition-all duration-300 outline-none font-sans text-sm',
    'focus:bg-white/[0.08] focus:border-primary-500/60 focus:ring-2 focus:ring-primary-500/20',
    error ? 'border-red-500/60' : 'border-white/10',
    icon && 'pl-11',
    label ? 'pt-6 pb-2' : 'py-3',
    className
  )

  const labelFloated = isFloated || focused

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div
            className="absolute left-3.5 pointer-events-none text-gray-500"
            style={{
              top: label ? '50%' : '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        {textarea ? (
          <>
            {label && (
              <label
                htmlFor={id}
                style={{
                  position: 'absolute',
                  left: icon ? 44 : 16,
                  top: labelFloated ? 8 : 14,
                  fontSize: labelFloated ? 11 : 14,
                  color: focused
                    ? 'rgba(108,99,255,0.9)'
                    : error
                    ? 'rgba(239,68,68,0.8)'
                    : 'rgba(139,139,167,0.8)',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: labelFloated ? 600 : 400,
                  letterSpacing: labelFloated ? '0.04em' : '0',
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                  zIndex: 1,
                  userSelect: 'none',
                }}
              >
                {label}
              </label>
            )}
            <textarea
              ref={ref}
              id={id}
              rows={rows}
              className={clsx(baseStyles, 'resize-none')}
              placeholder={label ? '' : placeholder}
              aria-label={label || undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-invalid={error ? 'true' : undefined}
              onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
              onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
              {...props}
            />
          </>
        ) : (
          <>
            {label && (
              <label
                htmlFor={id}
                style={{
                  position: 'absolute',
                  left: icon ? 44 : 16,
                  top: labelFloated ? 6 : '50%',
                  transform: labelFloated ? 'translateY(0)' : 'translateY(-50%)',
                  fontSize: labelFloated ? 11 : 14,
                  color: focused
                    ? 'rgba(108,99,255,0.9)'
                    : error
                    ? 'rgba(239,68,68,0.8)'
                    : 'rgba(139,139,167,0.8)',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: labelFloated ? 600 : 400,
                  letterSpacing: labelFloated ? '0.04em' : '0',
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                  zIndex: 1,
                  userSelect: 'none',
                }}
              >
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={id}
              className={baseStyles}
              placeholder={label ? '' : placeholder}
              aria-label={label || undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-invalid={error ? 'true' : undefined}
              onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
              onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
              {...props}
            />
          </>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400 font-sans" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
