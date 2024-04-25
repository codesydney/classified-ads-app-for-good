const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./swaggerConfig')
const HealthRoute = require('./routes/HealthRoute')
const UserRoute = require('./routes/UserRoute')
const AdminRoute = require('./routes/AdminRoute')
const { errorHandler, notFound } = require('./middleware/errorHandler')
const app = express()

app.use(express.json())

// Will this line break any previous func?
app.use(express.urlencoded())

app.use(cors({ credentials: true }))

app.use('/api/v1/health', HealthRoute)
app.use('/api/v1/users', UserRoute)
app.use('/api/v1/admin', AdminRoute)
// Serve Swagger UI only in development environment
if (process.env.NODE_ENV === 'development') {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
}

app.use(notFound)
app.use(errorHandler)

module.exports = app
