const crypto = require('crypto')
const bcrypt = require('bcrypt')

// Generate token to send in email
// Hash token for db storage.
exports.generateResetToken = async () => {
  const token = crypto.randomBytes(32).toString('hex')
  const hashedToken = await bcrypt.hash(token, 10)
  return { hashedToken, token }
}

// Compare token sent in request with hashed token stored in db.
exports.compareToken = async (token, hashedToken) => {
  const isMatch = await bcrypt.compare(token, hashedToken)
  return isMatch
}
