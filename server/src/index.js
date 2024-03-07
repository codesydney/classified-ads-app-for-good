const app = require('./app')
const Mongoose = require('./config/db')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await Mongoose().initialiseMongoConnection()
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (error) {
    logger.error(error)
  }
}

startServer()
