const mongoose = require('mongoose')
const logger = require('../utils/logger')
require('dotenv').config()

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/caafg'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('Connected to MongoDB...'))
  .catch(err => logger.error('Connection error:', err))

const db = mongoose.connection
db.on('error', err => logger.error('Connection error:', err))
