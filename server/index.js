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
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
}

const ADMIN_EMAIL = process.env.CONTACT_EMAIL || process.env.SMTP_USER

const baseStyle = `font-family:sans-serif;max-width:600px;margin:0 auto;padding:28px;background:#0a0f22;color:#f9fafb;border-radius:16px;`
const h2Style  = `color:#818cf8;margin:0 0 20px;font-size:22px;`
const rowStyle = `padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);`
const labelStyle = `color:#9ca3af;width:160px;vertical-align:top;padding-right:16px;font-size:13px;padding-top:2px;`
const valueStyle = `color:#f9fafb;font-weight:500;`
const blockStyle = `margin-top:20px;padding:16px;background:rgba(255,255,255,0.04);border-radius:10px;border-left:4px solid #818cf8;`
const footerStyle = `margin-top:24px;color:#4b5563;font-size:12px;`

const sendPair = async (transporter, adminMail, userMail) => {
  if (!transporter) return
  await transporter.sendMail(adminMail)
  await transporter.sendMail(userMail)
}

const userConfirm = (to, firstName, bodyHtml) => ({
  from: `"Digitech Offerings" <${process.env.SMTP_USER}>`,
  to,
  subject: `We've received your request, ${firstName}!`,
  html: `<div style="${baseStyle}">
    <h2 style="${h2Style}">Thanks, ${firstName}!</h2>
    <p style="color:#d1d5db;line-height:1.7;">We've received your request and our team will be in touch within 24 hours.</p>
    ${bodyHtml}
    <p style="color:#d1d5db;line-height:1.7;margin-top:20px;">Best regards,<br/><strong style="color:#818cf8;">The Digitech Offerings Team</strong></p>
    <p style="${footerStyle}">hello@digitechofferings.com</p>
  </div>`,
})

app.get('/api/health', (_req, res) => {
  const t = createTransporter()
  res.json({ status: 'ok', email: t ? 'configured' : 'not configured' })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, company, phone, service, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' })
  const t = createTransporter()
  if (!t) {
    console.warn('SMTP not configured — contact submission logged:', { name, email })
    return res.json({ success: true, message: 'Message received (email delivery not configured)' })
  }
  try {
    await t.sendMail({
      from: `"Digitech Contact Form" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, replyTo: email,
      subject: `New Enquiry from ${name}${company ? ` (${company})` : ''} — ${service || 'General'}`,
      html: `<div style="${baseStyle}"><h2 style="${h2Style}">New Contact Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="${rowStyle}"><td style="${labelStyle}">Name</td><td style="${valueStyle}">${name}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Email</td><td style="${valueStyle}"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
          ${company ? `<tr style="${rowStyle}"><td style="${labelStyle}">Company</td><td style="${valueStyle}">${company}</td></tr>` : ''}
          ${phone   ? `<tr style="${rowStyle}"><td style="${labelStyle}">Phone</td><td style="${valueStyle}">${phone}</td></tr>` : ''}
          ${service ? `<tr style="${rowStyle}"><td style="${labelStyle}">Service</td><td style="${valueStyle}">${service}</td></tr>` : ''}
        </table>
        <div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">MESSAGE</p><p style="color:#f9fafb;margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p></div>
        <p style="${footerStyle}">Sent via contact form</p></div>`,
    })
    await t.sendMail(userConfirm(email, name.split(' ')[0], `<div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">YOUR MESSAGE</p><p style="color:#f9fafb;margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p></div>`))
    return res.json({ success: true, message: 'Message sent successfully!' })
  } catch (err) {
    console.error('Nodemailer error:', err)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

app.post('/api/project-request', async (req, res) => {
  const { firstName, lastName, email, phone, company, role, services, description, projectType, budget, timeline, hearAbout } = req.body
  if (!firstName || !email || !company) return res.status(400).json({ error: 'Missing required fields' })
  const t = createTransporter()
  if (!t) {
    console.warn('Project request logged (SMTP not configured):', { firstName, email, company })
    return res.json({ success: true })
  }
  const servicesStr = Array.isArray(services) ? services.join(', ') : services
  try {
    await t.sendMail({
      from: `"Digitech Projects" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, replyTo: email,
      subject: `🚀 New Project Request — ${firstName} ${lastName} @ ${company}`,
      html: `<div style="${baseStyle}"><h2 style="${h2Style}">New Project Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="${rowStyle}"><td style="${labelStyle}">Name</td><td style="${valueStyle}">${firstName} ${lastName}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Email</td><td style="${valueStyle}"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
          ${phone   ? `<tr style="${rowStyle}"><td style="${labelStyle}">Phone</td><td style="${valueStyle}">${phone}</td></tr>` : ''}
          <tr style="${rowStyle}"><td style="${labelStyle}">Company</td><td style="${valueStyle}">${company}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Role</td><td style="${valueStyle}">${role}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Services</td><td style="${valueStyle}">${servicesStr}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Project Type</td><td style="${valueStyle}">${projectType}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Budget</td><td style="${valueStyle}">${budget}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Timeline</td><td style="${valueStyle}">${timeline}</td></tr>
          ${hearAbout ? `<tr style="${rowStyle}"><td style="${labelStyle}">Heard via</td><td style="${valueStyle}">${hearAbout}</td></tr>` : ''}
        </table>
        <div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">PROJECT DESCRIPTION</p><p style="color:#f9fafb;margin:0;line-height:1.7;white-space:pre-wrap;">${description}</p></div>
        <p style="${footerStyle}">Sent via Start a Project form</p></div>`,
    })
    await t.sendMail(userConfirm(email, firstName, `<div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">YOUR PROJECT DETAILS</p><p style="color:#f9fafb;margin:0;line-height:1.7;"><strong>Services:</strong> ${servicesStr}<br/><strong>Budget:</strong> ${budget}<br/><strong>Timeline:</strong> ${timeline}</p></div>`))
    return res.json({ success: true })
  } catch (err) {
    console.error('project-request email error:', err)
    return res.status(500).json({ error: 'Failed to send. Please try again.' })
  }
})

app.post('/api/call-schedule', async (req, res) => {
  const { fullName, email, company, topic, preferredDate, preferredTime, notes } = req.body
  if (!fullName || !email || !topic) return res.status(400).json({ error: 'Missing required fields' })
  const t = createTransporter()
  if (!t) {
    console.warn('Call schedule logged (SMTP not configured):', { fullName, email })
    return res.json({ success: true })
  }
  try {
    await t.sendMail({
      from: `"Digitech Calls" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, replyTo: email,
      subject: `📅 Call Scheduled — ${fullName}${company ? ` @ ${company}` : ''} — ${preferredDate}`,
      html: `<div style="${baseStyle}"><h2 style="${h2Style}">New Call Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="${rowStyle}"><td style="${labelStyle}">Name</td><td style="${valueStyle}">${fullName}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Email</td><td style="${valueStyle}"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
          ${company ? `<tr style="${rowStyle}"><td style="${labelStyle}">Company</td><td style="${valueStyle}">${company}</td></tr>` : ''}
          <tr style="${rowStyle}"><td style="${labelStyle}">Topic</td><td style="${valueStyle}">${topic}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Date</td><td style="${valueStyle}">${preferredDate}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Time</td><td style="${valueStyle}">${preferredTime}</td></tr>
        </table>
        ${notes ? `<div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">NOTES</p><p style="color:#f9fafb;margin:0;line-height:1.7;">${notes}</p></div>` : ''}
        <p style="${footerStyle}">Sent via Schedule a Call form</p></div>`,
    })
    await t.sendMail(userConfirm(email, fullName.split(' ')[0], `<div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">YOUR BOOKING DETAILS</p><p style="color:#f9fafb;margin:0;line-height:1.7;"><strong>Topic:</strong> ${topic}<br/><strong>Date:</strong> ${preferredDate}<br/><strong>Time:</strong> ${preferredTime}</p></div>`))
    return res.json({ success: true })
  } catch (err) {
    console.error('call-schedule email error:', err)
    return res.status(500).json({ error: 'Failed to send. Please try again.' })
  }
})

app.post('/api/partnership', async (req, res) => {
  const { name, email, company, website, partnershipType, companySize, proposal } = req.body
  if (!name || !email || !company) return res.status(400).json({ error: 'Missing required fields' })
  const t = createTransporter()
  if (!t) {
    console.warn('Partnership logged (SMTP not configured):', { name, email, company })
    return res.json({ success: true })
  }
  try {
    await t.sendMail({
      from: `"Digitech Partnerships" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, replyTo: email,
      subject: `🤝 Partnership Inquiry — ${name} @ ${company}`,
      html: `<div style="${baseStyle}"><h2 style="${h2Style}">New Partnership Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="${rowStyle}"><td style="${labelStyle}">Name</td><td style="${valueStyle}">${name}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Email</td><td style="${valueStyle}"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Company</td><td style="${valueStyle}">${company}</td></tr>
          ${website ? `<tr style="${rowStyle}"><td style="${labelStyle}">Website</td><td style="${valueStyle}"><a href="${website}" style="color:#818cf8;">${website}</a></td></tr>` : ''}
          <tr style="${rowStyle}"><td style="${labelStyle}">Partnership Type</td><td style="${valueStyle}">${partnershipType}</td></tr>
          ${companySize ? `<tr style="${rowStyle}"><td style="${labelStyle}">Company Size</td><td style="${valueStyle}">${companySize}</td></tr>` : ''}
        </table>
        <div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">PROPOSAL</p><p style="color:#f9fafb;margin:0;line-height:1.7;white-space:pre-wrap;">${proposal}</p></div>
        <p style="${footerStyle}">Sent via Partnership form</p></div>`,
    })
    await t.sendMail(userConfirm(email, name.split(' ')[0], `<div style="${blockStyle}"><p style="color:#9ca3af;margin:0 0 8px;font-size:13px;">YOUR INQUIRY</p><p style="color:#f9fafb;margin:0;line-height:1.7;"><strong>Partnership Type:</strong> ${partnershipType}<br/><strong>Company:</strong> ${company}</p></div>`))
    return res.json({ success: true })
  } catch (err) {
    console.error('partnership email error:', err)
    return res.status(500).json({ error: 'Failed to send. Please try again.' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`)
  const t = createTransporter()
  console.log(t ? `Email: configured via ${process.env.SMTP_HOST}` : 'Email: SMTP not yet configured')
})
