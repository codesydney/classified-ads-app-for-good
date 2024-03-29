const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PasswordResetTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    // expires in 15 minutes
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 900,
    },
  },
  { timestamps: true },
)

const PasswordResetToken = mongoose.model(
  'PasswordResetToken',
  PasswordResetTokenSchema,
)

module.exports = PasswordResetToken
