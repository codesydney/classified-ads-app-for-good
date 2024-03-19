const User = require('../models/User')

exports.findUserByEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

exports.createUser = async (firstName, lastName, email, password) => {
  const newUser = new User({
    firstName,
    lastName,
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

exports.getUsers = async ({ searchQuery = '', page = 1, limit = 10 }) => {
  let matchCriteria = {}
  if (searchQuery.length >= 3) {
    matchCriteria = {
      $or: [
        { fullName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { 'service.serviceName': { $regex: searchQuery, $options: 'i' } },
      ],
    }
  }

  let skip = (page - 1) * limit
  limit = parseInt(limit)

  try {
    const users = await User.find(matchCriteria).skip(skip).limit(limit)
    const total = await User.countDocuments(matchCriteria)
    const totalPages = Math.ceil(total / limit)

    return {
      data: users,
      meta: {
        total,
        page: Number(page),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }
  } catch (error) {
    throw error
  }
}
