const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function emailFormat(text) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="padding: 20px; background-color: #fff; border-radius: 5px;">
        ${text}
      </div>
    </div>
  `
}

async function sendResetEmail(email, token) {
  const message = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: 'Password Reset',
    html: emailFormat(`
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password</p>
      <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
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
