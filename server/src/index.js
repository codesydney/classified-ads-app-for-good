const app = require('./app')
const Mongoose = require('./config/db')

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await Mongoose().initialiseMongoConnection()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

startServer()
