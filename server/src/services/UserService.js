const User = require('../models/User')

// This is breaking my build. If you are a user without these fields -> will break on their own page.
const constructUnauthenticatedUsersResponse = user => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    state: user.state,
    alumniProfilePicture: user.alumniProfilePicture,
    education: {
      course: user.education.course,
      college: user.education.college,
      yearGraduated: user.education.yearGraduated,
    },
    service: {
      serviceName: user.service.serviceName,
      serviceLogo: user.service.serviceLogo,
      serviceUrl: user.service.serviceUrl,
    },
  }
}

const getUserById = async id => {
  const user = await User.findById(id).select('-__v -isAutomated').exec()

  if (!user) {
    return null
  }

  let userObject = user.toObject()

  userObject.id = userObject._id
  delete userObject._id

  return userObject
}

const updateAlumniProfile = async (userId, profileUpdates) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: profileUpdates },
    {
      new: true,
      select: '-__v -isAutomated',
    },
  ).exec()

  if (!updatedUser) {
    return null
  }

  const userObject = updatedUser.toObject()
  userObject.id = userObject._id
  delete userObject._id

  return userObject
}

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

const getUsers = async (
  { searchQuery = '', page = 1, limit = 10 },
  isAuthenticated,
) => {
  let matchCriteria = {
    hideProfile: false,
  }

  if (searchQuery.length >= 3) {
    matchCriteria = {
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { suburb: { $regex: searchQuery, $options: 'i' } },
        { postcode: { $regex: searchQuery, $options: 'i' } },
        { facebookName: { $regex: searchQuery, $options: 'i' } },
        { story: { $regex: searchQuery, $options: 'i' } },
        { 'education.course': { $regex: searchQuery, $options: 'i' } },
        { 'education.college': { $regex: searchQuery, $options: 'i' } },
        { 'service.serviceName': { $regex: searchQuery, $options: 'i' } },
        { 'service.serviceUrl': { $regex: searchQuery, $options: 'i' } },
      ],
    }
  }

  let skip = (page - 1) * limit
  limit = parseInt(limit)

  try {
    const users = await User.find(matchCriteria).skip(skip).limit(limit)
    const total = await User.countDocuments(matchCriteria)
    const totalPages = Math.ceil(total / limit)

    // based on the authentication status, filter out some fields
    const usersResponse = isAuthenticated
      ? users
      : users.map(userDetails =>
          constructUnauthenticatedUsersResponse(userDetails),
        )

    return {
      data: usersResponse,
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

const getUserProfile = async (userId, isAuthenticated) => {
  // check that the user has not set their profile to be hidden
  const user = await User.findById(userId).exec()

  if (!user || user.hideProfile) {
    return null
  }

  const userDetails = await getUserById(userId)

  // based on the authentication status, filter out some fields
  if (isAuthenticated) {
    return userDetails
  } else {
    return constructUnauthenticatedUsersResponse(userDetails)
  }
}

module.exports = {
  getUserById,
  updateAlumniProfile,
  findUserByEmail,
  createUser,
  findUserByEmailWithPassword,
  getUsers,
  getUserProfile,
}
