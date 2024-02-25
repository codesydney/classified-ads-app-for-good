const crypto = require('crypto')
const bcrypt = require('bcrypt')
exports.generateResetToken = async () => {
  const token = crypto.randomBytes(32).toString('hex')
  const hashedToken = await bcrypt.hash(token, 10)
  return { hashedToken, token }
}
