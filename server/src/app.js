const express = require('express')
const cors = require('cors')
const HealthRoute = require('./routes/HealthRoute')
const UserRoute = require('./routes/UserRoute')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/health', HealthRoute)
app.use('/users', UserRoute)

module.exports = app
