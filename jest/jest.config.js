module.exports = {
  rootDir: '/home/syntesis/projects/lerna-repo',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/web/badges/**/*.js',
    '<rootDir>/components/web/buttons/src/components/Button/**/*.js',
    '<rootDir>/components/web/buttons/src/components/IconButton/IconButton/*.js',
    '<rootDir>/components/web/commons/src/components/**/*.js',
    '<rootDir>/components/web/functions/src/**/*.js',
    '<rootDir>/components/web/indicator/src/components/**/*.js',
    '<rootDir>/components/web/info-table/src/components/**/*.js'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  projects: ['<rootDir>/jest/jest-lint.config.js', '<rootDir>/jest/jest-test.config.js']
}
