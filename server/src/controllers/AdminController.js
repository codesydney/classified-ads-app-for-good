const AdminService = require('../services/AdminService')
const catchAsync = require('../utils/catchAsync')
const UserService = require('../services/UserService')
const { deleteImageFromS3 } = require('../services/ImageUploadService')

// FETCH USERS BASED ON SEARCH QUERY
const getUsersAdmin = catchAsync(async (req, res, next) => {
  // Goes into body in from postman, will it be the same with axios?
  const { query, body, params } = req
  const result = await AdminService.getUsers(query || {})

  res.status(200).json({
    users: result.users,
    meta: result.meta,
    status: 'OK',
  })
})

// UPDATE A SINGLE USER DOCUMENT
const updateUser = catchAsync(async (req, res, next) => {
  const {
    query,
    body: updatedUserObj,
    params: { id },
  } = req

  const user = await UserService.getUserByIdMongooseDoc(id)

  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  const updatedUser = await AdminService.updateUser(
    user.toObject(),
    updatedUserObj,
    id,
  )

  if (!updatedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  // FORMAT USER OBJECT BEFORE RETURNING
  const userObject = updatedUser.toObject()
  userObject.id = userObject._id
  delete userObject._id
  delete userObject.fullName
  delete userObject.education?.yearGraduatedStr
  delete userObject.createdAt
  delete userObject.updatedAt
  delete userObject.__v
  delete userObject.isAutomated

  res.status(200).json({
    message: 'User updated successfully',
    status: 'OK',
    user: userObject,
  })
})

// DELETE A SINGLE USER DOCUMENT
const deleteUser = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req

  const deletedUser = await UserService.deleteUserProfile(id)

  if (!deletedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  const userObject = deletedUser.toObject()
  delete userObject._id

  return res.status(200).json({
    status: 'OK',
    message: 'User Deleted Successfully',
    user: userObject,
  })
})

// UPDATE A SINGLE USER PROFILE PICTURE
const updateUserProfilePic = catchAsync(async (req, res, next) => {
  const {
    file,
    params: { id },
  } = req

  if (!file) {
    return res.status(400).json({
      status: 'Error',
      message: 'No file uploaded',
    })
  }

  const updatedUser = await UserService.updateProfileImageV2(id, file)

  if (!updatedUser) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  // Format updatedUser to match other query results
  delete updatedUser.fullName
  delete updatedUser.education?.yearGraduatedStr
  delete updatedUser.createdAt
  delete updatedUser.updatedAt

  return res.status(200).json({
    status: 'OK',
    message: 'User profile image updated successfully',
    user: updatedUser,
  })
})

// DELETE A SINGLE USER PROFILE PICTURE
const deleteUserProfilePic = catchAsync(async (req, res, next) => {
  const {
    params: { id },
  } = req

  const user = await UserService.getUserByIdMongooseDoc(id)

  if (!user) {
    return res.status(404).json({
      status: 'Error',
      message: 'User not found',
    })
  }

  const userProfileImage = user?.alumniProfilePicture

  if (!userProfileImage) {
    return res.status(200).json({
      status: 'OK',
      message: 'User profile image deleted successfully',
      user: user,
    })
  }

  const deleted = await deleteImageFromS3(
    userProfileImage,
    process.env.AWS_BUCKET_NAME,
  )
  // Delete alumniProfilePicture property here....
  user.alumniProfilePicture = undefined
  await user.save()

  const userObject = user.toObject()
  userObject.id = userObject._id
  delete userObject._id
  delete userObject.fullName
  delete userObject.education?.yearGraduatedStr
  delete userObject.createdAt
  delete userObject.updatedAt
  delete userObject.__v
  delete userObject.isAutomated

  return res.status(200).json({
    status: 'OK',
    message: 'User profile image deleted successfully',
    user: userObject,
  })
})

module.exports = {
  getUsersAdmin,
  updateUser,
  deleteUser,
  updateUserProfilePic,
  deleteUserProfilePic,
}
