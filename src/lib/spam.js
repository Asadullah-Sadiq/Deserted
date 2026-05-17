const PREFIX = 'digitech_rl_'
const WINDOW_MS = 60 * 60 * 1000 // 1 hour per form type

/**
 * Returns { blocked: true, minutesLeft } if the user submitted too recently,
 * or { blocked: false } if they're allowed.
 */
export function checkRateLimit(formType) {
  try {
    const raw = localStorage.getItem(PREFIX + formType)
    if (!raw) return { blocked: false }
    const elapsed = Date.now() - parseInt(raw, 10)
    if (elapsed < WINDOW_MS) {
      return { blocked: true, minutesLeft: Math.ceil((WINDOW_MS - elapsed) / 60000) }
    }
  } catch {}
  return { blocked: false }
}

/**
 * Record a successful submission timestamp for rate-limit tracking.
 */
export function recordSubmission(formType) {
  try {
    localStorage.setItem(PREFIX + formType, String(Date.now()))
  } catch {}
}

/**
 * Returns true if a honeypot field was filled (bot detected).
 */
export function isHoneypotFilled(value) {
  return typeof value === 'string' && value.trim().length > 0
}
