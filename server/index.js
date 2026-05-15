import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'

const app = express()
const PORT = process.env.API_PORT || 3001

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? true
    : ['http://localhost:5000', `https://${process.env.REPLIT_DEV_DOMAIN}`],
  credentials: true,
}))
app.use(express.json())

const createTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

app.get('/api/health', (_req, res) => {
  const transporter = createTransporter()
  res.json({
    status: 'ok',
    email: transporter ? 'configured' : 'not configured (SMTP_HOST, SMTP_USER, SMTP_PASS missing)',
  })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, company, phone, service, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }

  const transporter = createTransporter()

  if (!transporter) {
    console.warn('SMTP not configured — logging contact form submission:', { name, email, company, service })
    return res.json({
      success: true,
      message: 'Message received (email delivery not configured yet — add SMTP_HOST, SMTP_USER, SMTP_PASS secrets to enable)',
    })
  }

  const toEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER

  try {
    await transporter.sendMail({
      from: `"Digitech Contact Form" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Enquiry from ${name}${company ? ` (${company})` : ''} — ${service || 'General'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d1424;color:#f9fafb;border-radius:12px;">
          <h2 style="color:#818cf8;margin-bottom:24px;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#9ca3af;width:140px;">Name</td><td style="padding:8px 0;color:#f9fafb;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#9ca3af;">Company</td><td style="padding:8px 0;color:#f9fafb;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding:8px 0;color:#9ca3af;">Phone</td><td style="padding:8px 0;color:#f9fafb;">${phone}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px 0;color:#9ca3af;">Service</td><td style="padding:8px 0;color:#f9fafb;">${service}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px;padding:16px;background:rgba(255,255,255,0.05);border-radius:8px;border-left:4px solid #818cf8;">
            <p style="color:#9ca3af;margin:0 0 8px 0;font-size:13px;">MESSAGE</p>
            <p style="color:#f9fafb;margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:24px;color:#4b5563;font-size:12px;">Sent via Digitech Offerings contact form</p>
        </div>
      `,
    })

    await transporter.sendMail({
      from: `"Digitech Offerings" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d1424;color:#f9fafb;border-radius:12px;">
          <h2 style="color:#818cf8;">Thanks for reaching out!</h2>
          <p style="color:#d1d5db;line-height:1.7;">Hi ${name.split(' ')[0]},</p>
          <p style="color:#d1d5db;line-height:1.7;">We've received your message and will get back to you within 24 hours — typically the same day.</p>
          <div style="margin:24px 0;padding:16px;background:rgba(99,102,241,0.1);border-radius:8px;border:1px solid rgba(99,102,241,0.3);">
            <p style="color:#9ca3af;margin:0 0 8px 0;font-size:13px;">YOUR MESSAGE</p>
            <p style="color:#f9fafb;margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#d1d5db;line-height:1.7;">Best regards,<br/><strong style="color:#818cf8;">The Digitech Offerings Team</strong></p>
          <p style="margin-top:24px;color:#4b5563;font-size:12px;">hello@digitechofferings.com</p>
        </div>
      `,
    })

    return res.json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Nodemailer error:', error)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`)
  const t = createTransporter()
  if (t) {
    console.log(`Email: configured via ${process.env.SMTP_HOST}`)
  } else {
    console.log('Email: SMTP not yet configured (add SMTP_HOST, SMTP_USER, SMTP_PASS)')
  }
})
