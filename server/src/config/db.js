const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/integration'
    : process.env.MONGO_URI || 'mongodb://localhost:27017/caafg'

const Mongoose = () => {
  const initialiseMongoConnection = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongoURI)
        .then(() => console.log('Connected to MongoDB...', mongoURI))
        .then(() => resolve(mongoose))
        .catch(err => {
          console.error('Connection error:', err)
          reject(err)
        })

      const db = mongoose.connection

      db.on('error', err => {
        console.error('Connection error:', err)
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
