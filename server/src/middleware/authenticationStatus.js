const jwt = require('jsonwebtoken')
require('dotenv').config()

const extractToken = req => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const parts = authHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1]
    }
  } else if (req.query.token) {
    return req.query.token
  }
  return null
}

const setAuthenticationStatus = (req, isAuthenticated) => {
  req.isAuthenticated = isAuthenticated
}

const authenticationStatus = async (req, res, next) => {
  const token = extractToken(req)
  if (!token) {
    setAuthenticationStatus(req, false)
    return next()
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // Check in the decodedToken to see if the user is the USTAA Officer
    if (!decoded.isOfficer) {
      setAuthenticationStatus(req, false)
      return next()
    }
    setAuthenticationStatus(req, true)
    next()
  } catch (err) {
    setAuthenticationStatus(req, false)
    next()
  }
}

module.exports = {
  authenticationStatus,
}
