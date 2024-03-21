const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const sendGridApiKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(sendGridApiKey)

const clientURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173/'
    : 'https://classifieds.code.sydney/'

// Template for reset email
function emailFormat(text) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="padding: 20px; background-color: #fff; border-radius: 5px;">
        ${text}
      </div>
    </div>
  `
}

// Send reset password email
async function sendResetEmail(email, token) {
  const message = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: 'Password Reset',
    html: emailFormat(`
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password</p>
      <a href="${clientURL}reset-password?token=${token}&email=${email}">Reset Password</a>
    `),
  }
  try {
    await sgMail.send(message)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = { sendResetEmail }
