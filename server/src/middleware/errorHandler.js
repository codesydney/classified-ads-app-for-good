const errorHandler = async (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.message || 'server error',
    status: 'ERROR',
  })
}

const notFound = (req, res, next) => {
  const error = new Error('Route not found')
  error.statusCode = 404
  next(error)
}

module.exports = {
  errorHandler,
  notFound,
}
