exports.errorHandler = async (err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({
    error: err.message || 'server error',
  })
}

exports.notFound = (req, res, next) => {
  const error = new Error('Route not found')
  error.statusCode = 404
  next(error)
}
