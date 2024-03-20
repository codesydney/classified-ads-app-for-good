const User = require('../models/User')

const findUserByEmail = email => {
  return User.findOne({ email })
}

const createUser = (firstName, lastName, email, password) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  })

  return newUser.save()
}

const findUserByEmailWithPassword = async email => {
  return User.findOne({
    email,
  }).select('+password')
}

const getUsers = async ({ searchQuery = '', page = 1, limit = 10 }) => {
  let matchCriteria = {}
  if (searchQuery.length >= 3) {
    matchCriteria = {
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
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

module.exports = {
  findUserByEmail,
  createUser,
  findUserByEmailWithPassword,
  getUsers,
}
