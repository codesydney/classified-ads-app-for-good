exports.errorHandler = async (err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({
    error: err.message || 'server error',
  })
}
