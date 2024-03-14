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

exports.getUsers = async ({ searchQuery = '', page = 1, limit = 10 }) => {
  const matchCriteria = searchQuery
    ? {
        $text: {
          $search: searchQuery,
        },
      }
    : {}

  let skip = (page - 1) * limit
  limit = parseInt(limit)

  try {
    const query = User.find(matchCriteria).skip(skip).limit(limit)

    // Only apply text score sorting if performing a text search
    if (searchQuery) {
      query.sort({ score: { $meta: 'textScore' } })
    }

    const users = await query
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
