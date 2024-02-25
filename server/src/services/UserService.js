const User = require('../models/User')

exports.findUserByEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

exports.createUser = async (email, password) => {
  const newUser = new User({
    email,
    password,
  })

  const savedUser = await newUser.save()
  return savedUser
}

exports.findUserByEmailWithPassword = async email => {
  const user = await User.findOne({
    email,
  }).select('+password')
  return user
}
