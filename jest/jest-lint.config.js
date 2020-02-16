module.exports = {
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  rootDir: '/home/syntesis/projects/lerna-repo',
  verbose: true,
  testMatch: ['<rootDir>/components/**/*.js']
}
