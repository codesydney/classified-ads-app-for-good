const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./swaggerConfig')
const HealthRoute = require('./routes/HealthRoute')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/health', HealthRoute)

app.use('/', swaggerUi.serve, async (req, res) => {
  if (req.path === '/') {
    return swaggerUi.setup(swaggerSpecs)(req, res)
  } else {
    return res.next()
  }
})

module.exports = app
