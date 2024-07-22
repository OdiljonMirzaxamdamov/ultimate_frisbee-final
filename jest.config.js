module.exports = {
  displayName: 'Unit tests',
  moduleFileExtensions: ['js'],
  moduleDirectories: ['src', 'node_modules'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  testMatch: ['<rootDir>/src/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
