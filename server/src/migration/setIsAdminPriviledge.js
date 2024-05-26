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

// This function sets the isAdmin field to false for all users where it is not set.
const setIsAdminPriviledge = async () => {
  try {
    const result = await User.updateMany(
      { isAdmin: { $exists: false } },
      { $set: { isAdmin: false } },
    )
    logger.info(
      `Updated ${result.modifiedCount} user(s) where isAdmin was not set.`,
    )
  } catch (err) {
    logger.error('Error updating users:', err)
  } finally {
    db.close()
  }
}

setIsAdminPriviledge()
