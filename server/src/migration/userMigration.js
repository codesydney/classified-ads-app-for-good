const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
const User = require('../models/User')
const logger = require('../utils/logger')
require('dotenv').config()

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/caafg'
const numUsers = parseInt(process.env.NUM_USERS) || 10

mongoose
  .connect(mongoURI)
  .then(() => logger.info('Connected to MongoDB...'))
  .catch(err => logger.error('Connection error:', err))

const db = mongoose.connection
db.on('error', err => logger.error('Connection error:', err))

const serviceNames = [
  'Accounting Pro',
  'Software Solutions',
  'Tech Support Hub',
  'Legal Consultancy',
  'Marketing Experts',
  'Financial Planning',
  'Engineering Innovations',
  'Creative Design Studio',
  'IT Network Services',
  'Real Estate Advisors',
  'Educational Resources',
  'Medical Health Services',
  'Hospitality Management',
  'Environmental Services',
  'Security & Surveillance',
  'Construction & Development',
  'Logistics & Transportation',
  'Human Resources Consulting',
  'Event Planning Professionals',
  'Fitness & Wellness Coaching',
]

const educationCourses = [
  'Software Engineering',
  'Computer Science',
  'Information Technology',
  'Electrical Engineering',
  'Business Administration',
  'Marketing',
  'Accounting',
  'Law',
  'Mechanical Engineering',
  'Civil Engineering',
]

const universities = [
  'UNSW',
  'University of Sydney',
  'Monash University',
  'University of Melbourne',
  'Australian National University',
  'University of Queensland',
  'University of Western Australia',
  'University of Adelaide',
  'University of Technology Sydney',
  'Macquarie University',
]

// Function to generate a random user with the password 'hello123'
const generateUser = async () => ({
  email: faker.internet.email(),
  password: await bcrypt.hash('hello123', await bcrypt.genSalt(10)),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: '0411222333',
  suburb: faker.location.city(),
  postcode: faker.location.zipCode('####'),
  facebookName: faker.internet.userName(),
  story: 'love it',
  alumniProfilePicture: faker.image.avatar(),
  education: {
    course: faker.helpers.arrayElement(educationCourses),
    college: faker.helpers.arrayElement(universities),
    yearGraduated: faker.date.between({ from: 2000, to: 2020 }),
  },
  service: {
    serviceName: faker.helpers.arrayElement(serviceNames),
    serviceDescription: 'We provide the best services',
    serviceUrl: 'https://www.example.com',
  },
  isAutomated: true,
  isOfficer: false,
  hideProfile: false,
  isProfileComplete: true,
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

insertUsers(numUsers)
