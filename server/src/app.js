const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./swaggerConfig')
const HealthRoute = require('./routes/HealthRoute')
const UserRoute = require('./routes/UserRoute')
const { errorHandler, notFound } = require('./middleware/errorHandler')
const app = express()

app.use(express.json())
app.use(cors({ credentials: true }))

app.use('/api/v1/health', HealthRoute)
app.use('/api/v1/users', UserRoute)

// Serve Swagger UI only in development environment
if (process.env.NODE_ENV === 'development') {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
}

app.use(notFound)
app.use(errorHandler)

module.exports = app
