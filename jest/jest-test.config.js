module.exports = {
  verbose: true,
  notify: true,
  displayName: 'test',
  rootDir: '/home/syntesis/projects/lerna-repo',
  testMatch: [
    '<rootDir>/__tests__/**/*.js'
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/setup-tests.js'
  ],
  snapshotSerializers: [
    '<rootDir>/node_modules/enzyme-to-json/serializer'
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  }
}
