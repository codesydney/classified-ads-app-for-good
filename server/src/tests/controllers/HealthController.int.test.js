const request = require('supertest')
const app = require('../../app')

describe('HealthController', () => {
  describe('GET /api/v1/health', () => {
    it('should return OK as a response to indicate healthy status', async () => {
      const response = await request(app).get('/api/v1/health')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        status: 'OK',
      })
    })
  })
})
