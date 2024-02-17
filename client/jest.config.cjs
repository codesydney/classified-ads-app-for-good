module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
