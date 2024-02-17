const { addTwoNumbers } = require('../../services/HealthService')

describe('HealthService', () => {
  describe('#addTwoNumbers', () => {
    it('should add two numbers with the correct output', () => {
      expect(addTwoNumbers(1, 2)).toBe(3)
    })
  })
})
