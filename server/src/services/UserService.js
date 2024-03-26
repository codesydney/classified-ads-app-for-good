const User = require('../models/User')

const constructUnauthenticatedUsersResponse = user => {
  const safeUser = user || {}
  const safeEducation = safeUser.education || {}
  const safeService = safeUser.service || {}

  return {
    id: safeUser.id || '',
    firstName: safeUser.firstName || '',
    lastName: safeUser.lastName || '',
    fullName: safeUser.fullName || '',
    state: safeUser.state || '',
    alumniProfilePicture: safeUser.alumniProfilePicture || '',
    education: {
      course: safeEducation.course || '',
      college: safeEducation.college || '',
      yearGraduated: safeEducation.yearGraduated || '',
    },
    service: {
      serviceName: safeService.serviceName || '',
      serviceLogo: safeService.serviceLogo || '',
      serviceUrl: safeService.serviceUrl || '',
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

// Need to return a mongoose doc to run .verifyPassword() and password field
const getUserByIdMongooseDoc = async id => {
  const user = await User.findById(id).select('+password')

  if (!user) {
    return null
  }

  return user
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

  // Check for the presence and non-emptiness of specific fields to determine if the profile is complete
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'state',
    'postcode',
    'story',
    'alumniProfilePicture',
    'education.college',
    'education.course',
    'education.yearGraduated',
  ]
  let isProfileComplete = true

  for (const field of requiredFields) {
    const fieldParts = field.split('.')
    let fieldValue = userObject

    for (const part of fieldParts) {
      fieldValue = fieldValue[part]
      if (fieldValue === undefined) {
        // If the field is missing at any level, set isProfileComplete to false and break out of the loop
        isProfileComplete = false
        break
      }
    }

    // If the field value is empty, set isProfileComplete to false
    if (isProfileComplete && (fieldValue === '' || fieldValue === null)) {
      isProfileComplete = false
    }

    // If isProfileComplete has been set to false, no need to check further fields
    if (!isProfileComplete) break
  }

  // Update the isProfileComplete status based on the fields check
  await User.findByIdAndUpdate(userId, { $set: { isProfileComplete } }).exec()

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
    $and: [{ hideProfile: false }],
  }

  if (searchQuery.length >= 3) {
    matchCriteria.$and.push({
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
    })
  } else {
    // If no searchQuery, just ensure hideProfile: false is the only criteria
    matchCriteria = { hideProfile: false }
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

const deleteUserProfile = async userId => {
  const deletedUser = await User.findByIdAndDelete(userId)

  if (!deletedUser) {
    return null
  }

  return deletedUser
}

module.exports = {
  getUserById,
  updateAlumniProfile,
  findUserByEmail,
  createUser,
  findUserByEmailWithPassword,
  getUsers,
  getUserProfile,
  getUserByIdMongooseDoc,
  deleteUserProfile,
}
