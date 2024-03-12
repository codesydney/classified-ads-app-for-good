const mongoose = require('mongoose')
const User = require('../models/User')
const logger = require('../utils/logger')
require('dotenv').config()

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/caafg'

mongoose
  .connect(mongoURI)
  .then(() => logger.info('Connected to MongoDB...'))
  .catch(err => logger.error('Connection error:', err))

const db = mongoose.connection
db.on('error', err => logger.error('Connection error:', err))

// Function to remove users where isAutomated is true
const removeAutomatedUsers = async () => {
  try {
    const result = await User.deleteMany({ isAutomated: true })
    logger.info(`Removed ${result.deletedCount} automated users.`)
  } catch (err) {
    logger.error('Error removing users:', err)
  } finally {
    db.close()
  }
}

removeAutomatedUsers()
