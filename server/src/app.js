const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./swaggerConfig')
const HealthRoute = require('./routes/HealthRoute')
const UserRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(express.json())
app.use(cors({ credentials: true }))

app.use('/api/v1/health', HealthRoute)
app.use('/api/v1/users', UserRoutes)

app.use(errorHandler)
// Serve Swagger UI only in development environment
if (process.env.NODE_ENV === 'development') {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
}

module.exports = app
