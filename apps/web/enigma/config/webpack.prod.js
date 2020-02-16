const common = require('./webpack.common.js')
const mode = 'production'

module.exports = (env, argv) => ({
  ...common(env, argv, mode),
  mode,
  stats: 'errors-only'
})
