const getUsers = (req, res, _next) => {
  return res.status(200).json({
    status: 'OK',
    users: [{ name: 'Joe Smith' }],
  })
}

module.exports = {
  getUsers,
}
