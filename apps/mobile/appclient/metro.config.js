/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const flow = require('lodash/fp/flow')
const get = require('lodash/fp/get')
const mapValues = require('lodash/fp/mapValues')
const pkgJson = require('./package.json')
// const isEmpty = require('lodash/isEmpty')

module.exports = {
  resolver: {
    extraNodeModules: flow(
      get('dependencies'),
      mapValues.convert({ cap: false })((_, name) => {
        const pathName = `../../../node_module/**/s/${ name }`
        // const syntesisPkg = get('[1]')(name.split('@syntesis/'))
        // if (!isEmpty(syntesisPkg)) {
        //   const [
        //     type,
        //     ...pkgNameArr
        //   ] = syntesisPkg.split('-')
        //   const pkgName = pkgNameArr.join('-')
        //
        //   switch (type) {
        //     case 'mc': {
        //       pathName = `../../../components/mobile/${ pkgName }`
        //       break
        //     }
        //     case 's': {
        //       pathName = `../../../services/${ pkgName }`
        //       break
        //     }
        //     default: break
        //   }
        // }

        return path.resolve(__dirname, pathName)
      })
    )(pkgJson)
  },

  projectRoot: path.resolve(__dirname),
  watchFolders: [
    // path.resolve(__dirname, '../../components'),
    path.resolve(__dirname, '../../../node_modules'),
    path.resolve(__dirname, '../../../components/mobile'),
    path.resolve(__dirname, '../../../components/web'),
    path.resolve(__dirname, '../../../services')
  ]
}
