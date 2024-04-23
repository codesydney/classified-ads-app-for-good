const authenticateAdmin = (req, res, next) => {
  const user = req.user
  console.log('user', user)
  next()
}

module.exports = {
  authenticateAdmin,
}
