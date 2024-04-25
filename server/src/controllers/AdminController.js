const AdminService = require('../services/AdminService')
const catchAsync = require('../utils/catchAsync')

const getUsersAdmin = catchAsync(async (req, res, next) => {
  // Goes into body in from postman, will it be the same with axios?
  const { query } = req
  console.log('the query', query)

  const result = await AdminService.getUsers(query || {})

  res.status(200).json({
    users: result.users,
    meta: result.meta,
    status: 'OK',
  })
})

module.exports = {
  getUsersAdmin,
}
