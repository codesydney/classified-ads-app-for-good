const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
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

// Function to generate a random user with the password 'hello123'
const generateUser = async () => ({
  email: 'promie.yutasane@gmail.com',
  password: await bcrypt.hash('hello123', await bcrypt.genSalt(10)),
  fullName: 'Promie',
  phone: '0423702138',
  suburb: 'Arncliffe',
  postcode: '2205',
  facebookName: 'pyut8988',
  story: 'love it',
  alumniProfilePicture: 'url here',
  education: {
    course: 'software engineering',
    college: 'unsw',
    yearGraduated: '2020',
  },
  service: {
    serviceName: 'consulting',
    serviceLogo: 'image url',
    serviceUrl: 'https://www.npmjs.com/package/@faker-js/faker',
  },
})

// Function to insert a batch of users into the database
const insertUsers = async numberOfUsers => {
  try {
    for (let i = 0; i < numberOfUsers; i++) {
      let user = await generateUser()
      const newUser = new User(user)
      await newUser.save()
    }
    logger.info(
      `${numberOfUsers} users successfully inserted into the database`,
    )
  } catch (err) {
    logger.error('Error inserting users:', err)
  } finally {
    db.close()
  }
}

insertUsers(1)
