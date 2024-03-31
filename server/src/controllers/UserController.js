const UserService = require('../services/UserService')
const PasswordResetService = require('../services/PasswordResetService')
const { createToken } = require('../utils/handleJwt')
const passwordResetTokenUtils = require('../utils/resetTokens')
const { sendResetEmail } = require('../utils/mail')
const catchAsync = require('../utils/catchAsync')
const buildNestedQuery = require('../utils/buildNestedUpdateQuery')

const signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  // Check email not in use already.
  const existingUser = await UserService.findUserByEmail(email)

  // If email already in use, return 409 response (conflict)
  if (existingUser) {
    const error = new Error('Email already in use')
    error.statusCode = 409
    throw error
  }

  // create new user;
  const newUser = await UserService.createUser(
    firstName,
    lastName,
    email,
    password,
  )

  // create token for user
  const token = createToken({
    id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    isOfficer: newUser.isOfficer,
  })

  // return 201 response with token
  return res.status(201).json({ message: 'User created', token, status: 'OK' })
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  // find user by email;
  const user = await UserService.findUserByEmailWithPassword(email)

  // If no user with this email exists, return 404 response
  if (!user) {
    const error = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  // Validate user password
  const passwordCorrect = await user.verifyPassword(password)
  // If password does not match, return 401 response
  if (!passwordCorrect) {
    const error = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  // create token for user
  const token = createToken({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    isOfficer: user.isOfficer,
  })

  // return token
  return res
    .status(200)
    .json({ message: 'User signed in', token, status: 'OK' })
})

const requestResetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body

  // Check there is an account associated with email
  const user = await UserService.findUserByEmail(email)

  // If no user with this email exists, send response with 200 status (security measure)
  if (!user) {
    return res.status(200).json({ message: 'Reset email sent', status: 'OK' })
  }

  // create reset token for the user
  const { token, hashedToken } =
    await passwordResetTokenUtils.generateResetToken()

  // save token to the db, with expiry date
  await PasswordResetService.generatePasswordResetToken(user._id, hashedToken)

  // send reset email
  await sendResetEmail(email, token)

  // return 200 response
  return res.status(200).json({ message: 'Reset email sent', status: 'OK' })
})

const resetPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  const { token } = req.query

  // Find user requesting reset
  const user = await UserService.findUserByEmail(email)
  if (!user) {
    const error = new Error('Not found.')
    error.statusCode = 404
    throw error
  }

  // Find token correlating to user requesting reset.
  const storedToken = await PasswordResetService.findTokenByUserId(user._id)

  if (!storedToken) {
    const error = new Error('Could not find resource.')
    error.statusCode = 404
    throw error
  }

  // compare token provided with token stored
  const isMatch = await passwordResetTokenUtils.compareToken(
    token,
    storedToken.token,
  )
  await PasswordResetService.findTokenAndDelete(user._id)

  if (!isMatch) {
    const error = new Error('Invalid Token')
    error.statusCode = 400
    throw error
  }

  // update the users password
  user.password = password
  await user.save()

  return res
    .status(200)
    .json({ message: 'Password successfully changed', status: 'OK' })
})

const getUsers = async (req, res) => {
  const { isAuthenticated } = req
  const { search, page, limit } = req.query

  try {
    const result = await UserService.getUsers(
      {
        searchQuery: search,
        page: page,
        limit: limit,
      },
      isAuthenticated,
    )

    res.status(200).json({
      status: 'OK',
      users: result.data,
      meta: result.meta,
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Failed to retrieve users',
      error: error.message,
    })
  }
}

const me = async (req, res) => {
  const {
    user: { id },
  } = req

  const user = await UserService.getUserById(id)

  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  res.status(200).json({
    status: 'OK',
    user,
  })
}

// Also used by brodie form general info update form.
const updateAlumniProfile = catchAsync(async (req, res) => {
  const { id } = req.user
  const profileUpdates = req.body

  const updatedUser = await UserService.updateAlumniProfile(id, profileUpdates)

  if (!updatedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  res.status(200).json({
    status: 'OK',
    message: 'Profile updated successfully',
    user: updatedUser,
  })
})

// Update service nested obj
const updateServiceInformation = catchAsync(async (req, res) => {
  const { id } = req.user
  const profileUpdates = req.body
  // Do stuff here for image ?
  const nestedQueryObj = buildNestedQuery('service', profileUpdates)

  const updatedUser = await UserService.updateAlumniProfile(id, nestedQueryObj)

  if (!updatedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  return res.status(200).json({
    status: 'OK',
    message: 'User Service updated',
    user: updatedUser,
  })
})

// update education nested obj
const updateEducationInformation = catchAsync(async (req, res) => {
  const { id } = req.user
  const profileUpdates = req.body

  const nestedQueryObj = buildNestedQuery('education', profileUpdates)

  const updatedUser = await UserService.updateAlumniProfile(id, nestedQueryObj)

  if (!updatedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }
  return res.status(200).json({
    status: 'OK',
    message: 'user education updated',
    user: updatedUser,
  })
})

const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.params
  const { isAuthenticated } = req

  const userDetails = await UserService.getUserProfile(userId, isAuthenticated)

  if (!userDetails) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  res.status(200).json({
    status: 'OK',
    message: 'User retrieved successfully',
    user: userDetails,
  })
})

// Update password for authenticated user
const updatePassword = catchAsync(async (req, res) => {
  const { id } = req.user
  const { currentPassword, newPassword } = req.body
  console.log(currentPassword)
  // Fetch user
  const user = await UserService.getUserByIdMongooseDoc(id)

  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }
  // check user entered valid current password.
  const validPassword = await user.verifyPassword(currentPassword)

  if (!validPassword) {
    return res.status(401).json({
      status: 'Error',
      message: 'Invalid Credentials',
    })
  }

  // Update password in db
  user.password = newPassword
  await user.save()

  res.status(200).json({
    status: 'OK',
    message: 'User password successfully changed',
  })
})

const deleteMe = catchAsync(async (req, res) => {
  const { id } = req.user

  const deletedUser = await UserService.deleteUserProfile(id)

  if (!deletedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  return res.status(204).json({
    status: 'OK',
    message: 'User ',
  })
})

const updateProfileImage = catchAsync(async (req, res, next) => {
  const { id } = req.user
  const { file } = req

  if (!file) {
    return res.status(400).json({
      status: 'Error',
      message: 'No file uploaded',
    })
  }

  const updatedUser = await UserService.updateProfileImage(id, file)

  if (!updatedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  return res.status(200).json({
    status: 'OK',
    message: 'User profile image updated successfully',
    user: updatedUser,
  })
})

module.exports = {
  signup,
  login,
  requestResetPassword,
  resetPassword,
  getUsers,
  me,
  updateProfileImage,
  updateAlumniProfile,
  updateServiceInformation,
  updateEducationInformation,
  getUserProfile,
  updatePassword,
  deleteMe,
}
