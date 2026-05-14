import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

export const sendContactEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured — form data:', formData)
    return { success: true, message: 'Message received (demo mode)' }
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'N/A',
        service: formData.service || 'General Inquiry',
        message: formData.message,
        to_name: 'Digitech Offerings Team',
      },
      PUBLIC_KEY
    )
    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error('EmailJS error:', error)
    throw new Error('Failed to send message. Please try again.')
  }
}

export const initEmailJS = () => {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY)
  }
}
