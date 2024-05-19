const AdminService = require('../services/AdminService')
const catchAsync = require('../utils/catchAsync')

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

module.exports = {
  getUsersAdmin,
  updateUser,
}
