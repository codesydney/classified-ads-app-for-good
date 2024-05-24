const AdminService = require('../services/AdminService')
const catchAsync = require('../utils/catchAsync')
const UserService = require('../services/UserService')
const { deleteImageFromS3 } = require('../services/ImageUploadService')

const getUsersAdmin = catchAsync(async (req, res, next) => {
  // Goes into body in from postman, will it be the same with axios?
  const { query, body, params } = req
  console.log('the query', query)
  const result = await AdminService.getUsers(query || {})

  res.status(200).json({
    users: result.users,
    meta: result.meta,
    status: 'OK',
  })
})

const updateUser = catchAsync(async (req, res, next) => {
  const { query, body, params } = req
  console.log('the query', query)
  console.log('the body', body)
  console.log('the params', params)

  res.status(200).json({
    message: 'Went through',
    status: 'OK',
  })
})

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
  console.log('user profile image')
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
  updateUserProfilePic,
  deleteUserProfilePic,
}
