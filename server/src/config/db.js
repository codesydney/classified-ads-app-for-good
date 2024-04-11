const mongoose = require('mongoose')
const logger = require('../utils/logger')
require('dotenv').config()

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/integration'
    : process.env.MONGO_URI || 'mongodb://localhost:27017/caafg'

console.log('mongoURI', mongoURI)

const Mongoose = () => {
  const initialiseMongoConnection = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongoURI)
        .then(() => logger.info('Connected to MongoDB...'))
        .then(() => resolve(mongoose))
        .catch(err => {
          logger.error('Connection error:', err)
          reject(err)
        })

      const db = mongoose.connection

      db.on('error', err => {
        logger.error('Connection error:', err)
        reject(err)
      })
    })
  }

  const closeMongoConnection = () => {
    return mongoose.disconnect()
  }

  return { initialiseMongoConnection, closeMongoConnection }
}

module.exports = Mongoose
