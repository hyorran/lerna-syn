const common = require('./webpack.common.js')
const mode = 'development'

module.exports = (env, argv) => {
  const {
    optimization,
    module: {
      rules
    },
    ...otherCommons
  } = common(env, argv, mode)
  return {
    ...otherCommons,
    mode,
    devtool: 'inline-source-map',
    devServer: {
      noInfo: false,
      port: 3000,
      open: true
    },
    optimization: {
      ...optimization,
      namedModules: true,
      namedChunks: true,
      moduleIds: 'hashed',
      nodeEnv: 'development',
      mangleWasmImports: true
    },
    module: {
      rules: [
        ...rules,
        {
          parser: {
            commonjs: true
          }
        }
      ]
    }
  }
}

