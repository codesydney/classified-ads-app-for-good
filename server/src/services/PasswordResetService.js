const PasswordResetToken = require('../models/PasswordResetToken')

// Generate new password reset token
const generatePasswordResetToken = async (id, hashedToken) => {
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

  return resetToken.save()
}

const findTokenByUserId = id => {
  return PasswordResetToken.findOne({ user: id })
}

const findTokenAndDelete = async id => {
  await PasswordResetToken.findOneAndDelete({ user: id })
}

module.exports = {
  generatePasswordResetToken,
  findTokenByUserId,
  findTokenAndDelete,
}
