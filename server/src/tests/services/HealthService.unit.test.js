const { addTwoNumbers } = require('../../services/HealthService')

describe('Health Service', () => {
  describe('#addTwoNumbers', () => {
    it('should add two numbers with the correct output', () => {
      expect(addTwoNumbers(1, 2)).toBe(3)
    })
  })
})
