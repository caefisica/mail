import nodemailer from "nodemailer"

type Payload = {
    recipient: string,
    subject: string,
    html: string, 
}

if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM) {
  throw new Error('SMTP configuration not set');
}

const smtpSettings = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}

export const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  })

  transporter.verify().then(() => {
    console.log('Ready for send emails')
  })

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data,
  })
}