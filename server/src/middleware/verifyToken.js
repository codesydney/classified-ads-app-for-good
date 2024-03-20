const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  let token = null

  if (authHeader) {
    const parts = authHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  } else if (req.query.token) {
    token = req.query.token
  }

  if (!token) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error('Unauthorized')
      error.statusCode = 401
      throw error
    }

    req.user = decoded
    next()
  })
}

module.exports = {
  verifyToken,
}
