import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'

const app  = express()
const PORT = process.env.API_PORT || 3001

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? true
    : ['http://localhost:5000', 'http://localhost:5001', `https://${process.env.REPLIT_DEV_DOMAIN}`],
  credentials: true,
}))
app.use(express.json())

// ─── Mailer ───────────────────────────────────────────────────────────────────

const createTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
}

const ADMIN_EMAIL = process.env.CONTACT_EMAIL || process.env.SMTP_USER
const FIREBASE_PROJECT = process.env.VITE_FIREBASE_PROJECT_ID || ''

// ─── Email styles ─────────────────────────────────────────────────────────────

const wrap   = (body) => `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#060b1a;">${body}</body></html>`
const card   = `font-family:'Segoe UI',sans-serif;max-width:620px;margin:0 auto;background:#0a0f22;border-radius:16px;overflow:hidden;border:1px solid rgba(108,99,255,0.2);`
const header = (accentColor = '#6C63FF') =>
  `<div style="background:linear-gradient(135deg,${accentColor}22,#0a0f22);padding:28px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.07);">
     <div style="display:flex;align-items:center;gap:12px;">
       <div style="width:36px;height:36px;background:linear-gradient(135deg,#6C63FF,#00D4FF);border-radius:10px;display:flex;align-items:center;justify-content:center;">
         <span style="color:#fff;font-size:18px;font-weight:900;line-height:1;">⚡</span>
       </div>
       <div>
         <span style="font-size:16px;font-weight:700;color:#818cf8;">Digitech</span>
         <span style="font-size:16px;font-weight:700;color:#f9fafb;"> Offerings</span>
       </div>
     </div>
   </div>`

const row   = (label, value, link = null) =>
  `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
     <td style="color:#9ca3af;font-size:12px;padding:10px 0;width:150px;vertical-align:top;text-transform:uppercase;letter-spacing:0.05em;">${label}</td>
     <td style="color:#f9fafb;font-size:14px;padding:10px 0;font-weight:500;">${link ? `<a href="${link}" style="color:#818cf8;text-decoration:none;">${value}</a>` : value}</td>
   </tr>`

const block = (title, content, color = '#818cf8') =>
  `<div style="margin-top:20px;padding:18px;background:rgba(255,255,255,0.03);border-radius:10px;border-left:4px solid ${color};">
     <p style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">${title}</p>
     <p style="color:#f9fafb;margin:0;line-height:1.75;font-size:14px;white-space:pre-wrap;">${content}</p>
   </div>`

const statusBadge = `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.3);text-transform:uppercase;letter-spacing:0.06em;">NEW</span>`

const footer = (formName) =>
  `<div style="padding:16px 32px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.05);margin-top:0;">
     <p style="color:#4b5563;font-size:12px;margin:0;">Submitted via <strong style="color:#6b7280;">${formName}</strong> on digitechofferings.com</p>
     <p style="color:#4b5563;font-size:12px;margin:6px 0 0;">
       <a href="mailto:hello@digitechofferings.com" style="color:#6C63FF;text-decoration:none;">hello@digitechofferings.com</a>
       &nbsp;·&nbsp; +92 308 1988801
       ${FIREBASE_PROJECT ? `&nbsp;·&nbsp; <a href="https://console.firebase.google.com/project/${FIREBASE_PROJECT}/firestore" style="color:#6C63FF;text-decoration:none;">View in Firebase →</a>` : ''}
     </p>
   </div>`

const ts = () => new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })

// ─── User confirmation template ───────────────────────────────────────────────

const buildUserConfirm = ({ to, firstName, subjectSuffix, summaryHtml, accentColor = '#6C63FF' }) => ({
  from: `"Digitech Offerings" <${process.env.SMTP_USER}>`,
  to,
  subject: `${subjectSuffix} — Digitech Offerings`,
  html: wrap(`
    <table style="${card}" cellpadding="0" cellspacing="0">
      ${header(accentColor)}
      <tr><td style="padding:28px 32px;">
        <h2 style="color:#f9fafb;margin:0 0 8px;font-size:22px;">Thanks, ${firstName}!</h2>
        <p style="color:#9ca3af;margin:0 0 20px;line-height:1.7;">
          We've received your request and our team will be in touch within <strong style="color:#f9fafb;">24 business hours</strong>.
        </p>
        ${summaryHtml}
        <p style="color:#9ca3af;margin:20px 0 0;line-height:1.7;">
          In the meantime, feel free to reply to this email with any questions.<br/>
          <strong style="color:#818cf8;">The Digitech Offerings Team</strong>
        </p>
      </td></tr>
      <tr><td>
        ${footer('website')}
      </td></tr>
    </table>
  `),
})

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  const t = createTransporter()
  res.json({ status: 'ok', email: t ? `configured via ${process.env.SMTP_HOST}` : 'not configured' })
})

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, company, phone, service, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' })

  const t = createTransporter()
  if (!t) {
    console.warn('SMTP not configured — contact logged:', { name, email })
    return res.json({ success: true, message: 'Message received (email delivery not configured)' })
  }

  try {
    // Admin notification
    await t.sendMail({
      from: `"Digitech Contact" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, replyTo: email,
      subject: `📩 New Enquiry from ${name}${company ? ` (${company})` : ''} — ${service || 'General'}`,
      html: wrap(`
        <table style="${card}" cellpadding="0" cellspacing="0">
          ${header('#6C63FF')}
          <tr><td style="padding:24px 32px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
              <h2 style="color:#f9fafb;margin:0;font-size:20px;">New Contact Enquiry</h2>
              ${statusBadge}
            </div>
            <p style="color:#6b7280;font-size:12px;margin:0 0 20px;">${ts()}</p>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name',    name)}
              ${row('Email',   email, `mailto:${email}`)}
              ${company ? row('Company', company) : ''}
              ${phone   ? row('Phone',   phone,   `tel:${phone}`) : ''}
              ${service ? row('Service', service) : ''}
            </table>
            ${block('Message', message)}
          </td></tr>
          <tr><td>${footer('Contact Form')}</td></tr>
        </table>
      `),
    })

    // User confirmation
    await t.sendMail(buildUserConfirm({
      to: email,
      firstName: name.split(' ')[0],
      subjectSuffix: "We've received your message",
      accentColor: '#6C63FF',
      summaryHtml: block('Your Message', message),
    }))

    return res.json({ success: true, message: 'Message sent successfully!' })
  } catch (err) {
    console.error('contact email error:', err)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

// Start a Project
app.post('/api/project-request', async (req, res) => {
  const { firstName, lastName, email, phone, company, role, services, description, projectType, budget, timeline, hearAbout } = req.body
  if (!firstName || !email || !company) return res.status(400).json({ error: 'Missing required fields' })

  const t = createTransporter()
  if (!t) {
    console.warn('Project request logged (SMTP not configured):', { firstName, email, company })
    return res.json({ success: true })
  }

  const servicesStr = Array.isArray(services) ? services.join(', ') : (services || '—')

  try {
    await t.sendMail({
      from: `"Digitech Projects" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, replyTo: email,
      subject: `🚀 New Project Request from ${company} — ${firstName} ${lastName}`,
      html: wrap(`
        <table style="${card}" cellpadding="0" cellspacing="0">
          ${header('#6C63FF')}
          <tr><td style="padding:24px 32px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
              <h2 style="color:#f9fafb;margin:0;font-size:20px;">New Project Request</h2>
              ${statusBadge}
            </div>
            <p style="color:#6b7280;font-size:12px;margin:0 0 20px;">${ts()}</p>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name',         `${firstName} ${lastName}`)}
              ${row('Email',        email,   `mailto:${email}`)}
              ${phone    ? row('Phone',        phone,   `tel:${phone}`) : ''}
              ${row('Company',      company)}
              ${row('Role',         role)}
              ${row('Services',     servicesStr)}
              ${row('Project Type', projectType)}
              ${row('Budget',       budget)}
              ${row('Timeline',     timeline)}
              ${hearAbout ? row('Heard via', hearAbout) : ''}
            </table>
            ${block('Project Description', description)}
          </td></tr>
          <tr><td>${footer('Start a Project')}</td></tr>
        </table>
      `),
    })

    await t.sendMail(buildUserConfirm({
      to: email,
      firstName,
      subjectSuffix: 'Your Project Request',
      accentColor: '#6C63FF',
      summaryHtml: block('Your Request Summary',
        `Services: ${servicesStr}\nBudget: ${budget}\nTimeline: ${timeline}\nProject Type: ${projectType}`),
    }))

    return res.json({ success: true })
  } catch (err) {
    console.error('project-request email error:', err)
    return res.status(500).json({ error: 'Failed to send. Please try again.' })
  }
})

// Book a Call
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
      subject: `📅 Call Scheduled — ${fullName}${company ? ` @ ${company}` : ''} on ${preferredDate}`,
      html: wrap(`
        <table style="${card}" cellpadding="0" cellspacing="0">
          ${header('#00D4FF')}
          <tr><td style="padding:24px 32px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
              <h2 style="color:#f9fafb;margin:0;font-size:20px;">New Call Request</h2>
              ${statusBadge}
            </div>
            <p style="color:#6b7280;font-size:12px;margin:0 0 20px;">${ts()}</p>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name',     fullName)}
              ${row('Email',    email,   `mailto:${email}`)}
              ${company ? row('Company', company) : ''}
              ${row('Topic',    topic)}
              ${row('Date',     preferredDate)}
              ${row('Time',     preferredTime)}
            </table>
            ${notes ? block('Notes', notes, '#00D4FF') : ''}
          </td></tr>
          <tr><td>${footer('Book a Call')}</td></tr>
        </table>
      `),
    })

    await t.sendMail(buildUserConfirm({
      to: email,
      firstName: fullName.split(' ')[0],
      subjectSuffix: 'Your Call is Scheduled',
      accentColor: '#00D4FF',
      summaryHtml: block('Your Booking Details',
        `Topic: ${topic}\nDate: ${preferredDate}\nTime: ${preferredTime}${notes ? `\nNotes: ${notes}` : ''}`,
        '#00D4FF'),
    }))

    return res.json({ success: true })
  } catch (err) {
    console.error('call-schedule email error:', err)
    return res.status(500).json({ error: 'Failed to send. Please try again.' })
  }
})

// Partnership
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
      html: wrap(`
        <table style="${card}" cellpadding="0" cellspacing="0">
          ${header('#FF6B9D')}
          <tr><td style="padding:24px 32px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
              <h2 style="color:#f9fafb;margin:0;font-size:20px;">New Partnership Inquiry</h2>
              ${statusBadge}
            </div>
            <p style="color:#6b7280;font-size:12px;margin:0 0 20px;">${ts()}</p>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name',             name)}
              ${row('Email',            email, `mailto:${email}`)}
              ${row('Company',          company)}
              ${website     ? row('Website',          website, website) : ''}
              ${row('Partnership Type', partnershipType)}
              ${companySize ? row('Company Size',     companySize) : ''}
            </table>
            ${block('Proposal', proposal, '#FF6B9D')}
          </td></tr>
          <tr><td>${footer('Partnership Form')}</td></tr>
        </table>
      `),
    })

    await t.sendMail(buildUserConfirm({
      to: email,
      firstName: name.split(' ')[0],
      subjectSuffix: 'Your Partnership Inquiry',
      accentColor: '#FF6B9D',
      summaryHtml: block('Your Inquiry Summary',
        `Partnership Type: ${partnershipType}\nCompany: ${company}${website ? `\nWebsite: ${website}` : ''}`,
        '#FF6B9D'),
    }))

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
