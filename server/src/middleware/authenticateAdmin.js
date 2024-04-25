const authenticateAdmin = (req, res, next) => {
  const { isAdmin } = req.user

  // if user doesn't have admin role.
  if (!isAdmin) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  next()
}

module.exports = {
  authenticateAdmin,
}
