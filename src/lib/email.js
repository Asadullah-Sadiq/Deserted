export const sendContactEmail = async (formData) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      phone: formData.phone || '',
      service: formData.service || 'General Inquiry',
      message: formData.message,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Failed to send message. Please try again.')
  }

  return data
}
