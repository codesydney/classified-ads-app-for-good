const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailRegex =
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
const phoneRegex =
  /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/
const postcodeRegex = /^[0-9]{4}$/
const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: email => emailRegex.test(email),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Hide password from query results
  },
  fullName: {
    type: String,
    trim: true,
    minLength: [3, 'Full name must be at least 3 characters long'],
    maxLength: [50, 'Full name must be at most 50 characters long'],
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: phone => phoneRegex.test(phone),
      message: 'Invalid phone number format',
    },
  },
  suburb: {
    type: String,
    trim: true,
    minLength: [3, 'Suburb must be at least 3 characters long'],
    maxLength: [50, 'Suburb must be at most 50 characters long'],
  },
  postcode: {
    type: String,
    trim: true,
    validate: {
      validator: postcode => postcodeRegex.test(postcode),
      message: 'Invalid postcode format',
    },
  },
  facebookName: {
    type: String,
    trim: true,
    minLength: [3, 'Facebook name must be at least 3 characters long'],
    maxLength: [50, 'Facebook name must be at most 50 characters long'],
  },
  story: {
    type: String,
    trim: true,
    minLength: [3, 'Story must be at least 3 characters long'],
    maxLength: [500, 'Story must be at most 500 characters long'],
  },
  alumniProfilePicture: {
    type: String,
    trim: true,
  },
  education: {
    course: {
      type: String,
      trim: true,
      minLength: [3, 'Course must be at least 3 characters long'],
    },
    college: {
      type: String,
      trim: true,
      minLength: [3, 'College must be at least 3 characters long'],
    },
    yearGraduated: {
      type: Number,
      min: [1900, 'Year must be at least 1900'],
      max: [new Date().getFullYear(), 'Year must be at most the current year'],
    },
  },
  service: {
    serviceName: {
      type: String,
      trim: true,
      minLength: [3, 'Service name must be at least 3 characters long'],
    },
    serviceLogo: {
      type: String,
      trim: true,
    },
    serviceUrl: {
      type: String,
      trim: true,
      validate: {
        validator: url => urlRegex.test(url),
        message: 'Invalid URL format',
      },
    },
  },
})

UserSchema.plugin(require('mongoose-bcrypt'))
module.exports = mongoose.model('User', UserSchema)
