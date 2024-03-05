const request = require('supertest')
const app = require('../../app')
const Mongoose = require('../../config/db')
const User = require('../../models/User')

// Services to mock
const emailService = require('../../utils/mail')
const passwordResetTokenUtils = require('../../utils/resetTokens')
const PasswordResetService = require('../../services/PasswordResetService')

jest.mock('../../utils/mail')
jest.mock('../../services/PasswordResetService', () => {
  const originalModule = jest.requireActual(
    '../../services/PasswordResetService',
  )
  return {
    ...originalModule,
    findTokenByUserId: jest.fn(),
    findTokenAndDelete: jest.fn(),
  }
})
jest.mock('../../utils/resetTokens', () => {
  const originalModule = jest.requireActual('../../utils/resetTokens')
  return {
    ...originalModule,
    compareToken: jest.fn(),
  }
})

beforeAll(async () => {
  await Mongoose().initialiseMongoConnection()
  console.log('connected to db')
})

afterAll(async () => {
  await Mongoose().closeMongoConnection()
  console.log('disconnected from db')
})

describe('UserController', () => {
  beforeEach(async () => {
    await User.deleteMany({}) // clear the users collection
    jest.clearAllMocks()
  })

  // SIGN UP ENDPOINT
  describe('GET /api/v1/users/signup', () => {
    it('should respond with status 201 and jwt', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      }

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(validUserData)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        message: 'User created',
        token: expect.any(String),
        status: 'OK',
      })
    })

    it('should respond with status 409 if user already exists', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      }

      await User.create(validUserData)

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(validUserData)

      expect(response.status).toBe(409)
      expect(response.body).toEqual({
        error: 'Email already in use',
        status: 'ERROR',
      })
    })

    it('Should respond with a status of 422 if the email is invalid', async () => {
      const invalidUserData = {
        email: 'testexam',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      }

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(invalidUserData)

      expect(response.status).toBe(422)
      expect(response.body).toEqual({
        error: expect.any(Array),
        status: 'ERROR',
      })
    })

    it('Should respond with a status of 422 if the password is invalid', async () => {
      const invalidUserData = {
        email: 'test@email.com',
        password: 'test',
        passwordConfirm: 'test',
      }

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(invalidUserData)

      expect(response.status).toBe(422)
      expect(response.body.error[0].msg).toEqual('Invalid password format')
    })

    it('Should respond with a status of 422 if the password and password confirm dont match', async () => {
      const invalidUserData = {
        email: 'test@email.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword1',
      }

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(invalidUserData)

      expect(response.status).toBe(422)
      expect(response.body.error[0].msg).toEqual('Passwords do not match')
    })
  })

  // SIGN IN ENDPOINT
  describe('POST /api/v1/users/signin', () => {
    it('should respond with status 200 and jwt if user exists and credentials are valid', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }

      await User.create(validUserData)

      const response = await request(app)
        .post('/api/v1/users/signin')
        .send(validUserData)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        message: 'User signed in',
        token: expect.any(String),
        status: 'OK',
      })
    })

    it('should respond with status 401 if user does not exist', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }

      const response = await request(app)
        .post('/api/v1/users/signin')
        .send(validUserData)

      expect(response.status).toBe(401)
      expect(response.body).toEqual({
        error: 'Invalid credentials',
        status: 'ERROR',
      })
    })

    it('should respond with status 401 if user exists but credentials are invalid', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }
      const invalidUserData = {
        email: 'test@example.com',
        password: 'testpassword1',
      }

      await User.create(validUserData)

      const response = await request(app)
        .post('/api/v1/users/signin')
        .send(invalidUserData)

      expect(response.status).toBe(401)
      expect(response.body).toEqual({
        error: 'Invalid credentials',
        status: 'ERROR',
      })
    })

    it('Should respond with a status of 422 if the email is invalid', async () => {
      const invalidUserData = {
        email: 'testexam',
        password: 'testpassword',
      }

      const response = await request(app)
        .post('/api/v1/users/signin')
        .send(invalidUserData)

      expect(response.status).toBe(422)
      expect(response.body).toEqual({
        error: expect.any(Array),
        status: 'ERROR',
      })
    })

    it('Should respond with a status of 422 if the password is invalid', async () => {
      const invalidUserData = {
        email: 'test@example.com',
        password: 'testp',
      }

      const response = await request(app)
        .post('/api/v1/users/signin')
        .send(invalidUserData)

      expect(response.status).toBe(422)
      expect(response.body.error[0].msg).toEqual('Invalid password format')
    })
  })

  // REQUEST RESET PASSWORD ENDPOINT
  describe('POST /api/v1/users/request-reset-password', () => {
    it('should respond with status 200 if user exists and email is valid', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      }

      emailService.sendResetEmail.mockResolvedValue(true)
      const spyCreateResetToken = jest.spyOn(
        passwordResetTokenUtils,
        'generateResetToken',
      )
      const spyTokenService = jest.spyOn(
        PasswordResetService,
        'generatePasswordResetToken',
      )

      await User.create(validUserData)

      const response = await request(app)
        .post('/api/v1/users/request-reset-password')
        .send({ email: 'test@example.com' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        message: 'Reset email sent',
        status: 'OK',
      })

      expect(emailService.sendResetEmail).toHaveBeenCalled()
      expect(spyCreateResetToken).toHaveBeenCalled()
      expect(spyTokenService).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(String),
      )
    })

    it('should respond with status 200 if user does not exist but email is valid', async () => {
      const spyCreateResetToken = jest.spyOn(
        passwordResetTokenUtils,
        'generateResetToken',
      )
      const spyTokenService = jest.spyOn(
        PasswordResetService,
        'generatePasswordResetToken',
      )

      const response = await request(app)
        .post('/api/v1/users/request-reset-password')
        .send({ email: 'test@example.com' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        message: 'Reset email sent',
        status: 'OK',
      })

      expect(emailService.sendResetEmail).not.toHaveBeenCalled()
      expect(spyCreateResetToken).not.toHaveBeenCalled()
      expect(spyTokenService).not.toHaveBeenCalled()
    })

    it('should respond with status 422 if email is invalid', async () => {
      const response = await request(app)
        .post('/api/v1/users/request-reset-password')
        .send({ email: 'test' })

      expect(response.status).toBe(422)
      expect(response.body).toEqual({
        error: expect.any(Array),
        status: 'ERROR',
      })
    })

    it('should respond with status 500 if email service fails', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      }
      let error = new Error('Email service failed')
      error.status = 500
      emailService.sendResetEmail.mockRejectedValue(error)

      await User.create(validUserData)

      const response = await request(app)
        .post('/api/v1/users/request-reset-password')
        .send({ email: 'test@example.com' })

      expect(response.status).toBe(500)
      expect(response.body).toEqual({
        error: 'Email service failed',
        status: 'ERROR',
      })
    })
  })

  // RESET PASSWORD ENDPOINT
  describe('POST /api/v1/users/reset-password', () => {
    it('should respond with status 200 if token is valid and user exists', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }

      const validUserResetData = {
        email: 'test@example.com',
        password: 'testpassword1',
        passwordConfirm: 'testpassword1',
      }

      const user = await User.create(validUserData)

      const validToken = {
        user: user._id,
        storedToken: 'validtoken',
      }

      const token = await PasswordResetService.generatePasswordResetToken(
        user._id,
        validToken.storedToken,
      )

      PasswordResetService.findTokenByUserId.mockResolvedValue(true)
      PasswordResetService.findTokenAndDelete.mockResolvedValue(token)
      passwordResetTokenUtils.compareToken.mockResolvedValue(true)
      const response = await request(app)
        .post('/api/v1/users/reset-password?token=validtoken')
        .send(validUserResetData)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        message: 'Password successfully changed',
        status: 'OK',
      })

      expect(PasswordResetService.findTokenByUserId).toHaveBeenCalledWith(
        user._id,
      )
      expect(passwordResetTokenUtils.compareToken).toHaveBeenCalledWith(
        'validtoken',
        token.storedToken,
      )
      expect(PasswordResetService.findTokenAndDelete).toHaveBeenCalledWith(
        user._id,
      )
    })

    it('should allow the user to login with new password after changing it', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }

      const validUserResetData = {
        email: 'test@example.com',
        password: 'testpassword1',
        passwordConfirm: 'testpassword1',
      }

      const user = await User.create(validUserData)

      const validToken = {
        user: user._id,
        storedToken: 'validtoken',
      }

      const token = await PasswordResetService.generatePasswordResetToken(
        user._id,
        validToken.storedToken,
      )

      PasswordResetService.findTokenByUserId.mockResolvedValue(true)
      PasswordResetService.findTokenAndDelete.mockResolvedValue(token)
      passwordResetTokenUtils.compareToken.mockResolvedValue(true)

      const response = await request(app)
        .post('/api/v1/users/reset-password?token=validtoken')
        .send(validUserResetData)
      const loginResponse = await request(app)
        .post('/api/v1/users/signin')
        .send(validUserResetData)

      expect(loginResponse.status).toBe(200)
      expect(loginResponse.body).toEqual({
        message: 'User signed in',
        token: expect.any(String),
        status: 'OK',
      })
    })

    it('should not allow the user to login with old password after changing it', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }

      const validUserResetData = {
        email: 'test@example.com',
        password: 'testpassword1',
        passwordConfirm: 'testpassword1',
      }

      const user = await User.create(validUserData)

      const validToken = {
        user: user._id,
        storedToken: 'validtoken',
      }

      const token = await PasswordResetService.generatePasswordResetToken(
        user._id,
        validToken.storedToken,
      )

      PasswordResetService.findTokenByUserId.mockResolvedValue(true)
      PasswordResetService.findTokenAndDelete.mockResolvedValue(token)
      passwordResetTokenUtils.compareToken.mockResolvedValue(true)

      const response = await request(app)
        .post('/api/v1/users/reset-password?token=validtoken')
        .send(validUserResetData)
      const loginResponse = await request(app)
        .post('/api/v1/users/signin')
        .send(validUserData)

      expect(loginResponse.status).toBe(401)
      expect(loginResponse.body).toEqual({
        error: 'Invalid credentials',
        status: 'ERROR',
      })
    })

    it('should respond with status 404 if no user exists', async () => {
      const validUserResetData = {
        email: 'test@example.com',
        password: 'testpassword1',
        passwordConfirm: 'testpassword1',
      }

      PasswordResetService.findTokenByUserId.mockResolvedValue(true)
      PasswordResetService.findTokenAndDelete.mockResolvedValue(true)
      passwordResetTokenUtils.compareToken.mockResolvedValue(true)

      const response = await request(app)
        .post('/api/v1/users/reset-password?token=validtoken')
        .send(validUserResetData)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        error: 'Not found.',
        status: 'ERROR',
      })

      expect(PasswordResetService.findTokenByUserId).not.toHaveBeenCalled()
      expect(passwordResetTokenUtils.compareToken).not.toHaveBeenCalled()
      expect(PasswordResetService.findTokenAndDelete).not.toHaveBeenCalled()
    })

    it('should respond with status 404 if no token exists', async () => {
      const validUserData = {
        email: 'test@example.com',
        password: 'testpassword',
      }

      const validUserResetData = {
        email: 'test@example.com',
        password: 'testpassword1',
        passwordConfirm: 'testpassword1',
      }

      const user = await User.create(validUserData)
      PasswordResetService.findTokenByUserId.mockResolvedValue(null)
      PasswordResetService.findTokenAndDelete.mockResolvedValue(true)
      passwordResetTokenUtils.compareToken.mockResolvedValue(true)

      const response = await request(app)
        .post('/api/v1/users/reset-password?token=validtoken')
        .send(validUserResetData)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        error: 'Could not find resource.',
        status: 'ERROR',
      })

      expect(PasswordResetService.findTokenByUserId).toHaveBeenCalledWith(
        user._id,
      )
      expect(passwordResetTokenUtils.compareToken).not.toHaveBeenCalled()
      expect(PasswordResetService.findTokenAndDelete).not.toHaveBeenCalled()
    })
  })

  it('should respond with status 400 if token is invalid, (compare token function returns false)', async () => {
    const validUserData = {
      email: 'test@example.com',
      password: 'testpassword',
    }

    const validUserResetData = {
      email: 'test@example.com',
      password: 'testpassword1',
      passwordConfirm: 'testpassword1',
    }

    const user = await User.create(validUserData)
    PasswordResetService.findTokenByUserId.mockResolvedValue({
      user: user._id,
      token: 'hashed token',
    })
    PasswordResetService.findTokenAndDelete.mockResolvedValue(true)
    passwordResetTokenUtils.compareToken.mockResolvedValue(false)

    const response = await request(app)
      .post('/api/v1/users/reset-password?token=validtoken')
      .send(validUserResetData)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Invalid Token',
      status: 'ERROR',
    })

    expect(PasswordResetService.findTokenByUserId).toHaveBeenCalledWith(
      user._id,
    )
    expect(passwordResetTokenUtils.compareToken).toHaveBeenCalledWith(
      'validtoken',
      'hashed token',
    )
    expect(PasswordResetService.findTokenAndDelete).toHaveBeenCalledWith(
      user._id,
    )
  })
})
