const getHealth = (req, res, _next) => {
  return res.status(200).json({
    status: 'OK',
  })
}

module.exports = {
  getHealth,
}
