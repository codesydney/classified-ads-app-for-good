const PasswordResetToken = require('../models/PasswordResetToken')

// Generate new password reset token
exports.generatePasswordResetToken = async (id, hashedToken) => {
  // Does user have an existing token already?
  const existingToken = await PasswordResetToken.findOne({ user: id })

  // If so, delete it
  if (existingToken) {
    await existingToken.deleteOne()
  }

  // Create new token
  const resetToken = new PasswordResetToken({
    user: id,
    token: hashedToken,
  })

  const savedToken = await resetToken.save()
  return savedToken
}
