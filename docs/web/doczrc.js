import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

const get = require('lodash/get')
const babelConfigJs = require('../../babel.config')

export default {
  modifyBabelRc: ((config) => {
    const babelConfig = babelConfigJs(config)
    return {
      ...babelConfig,
      ...config,
      presets: [
        ...get(babelConfig, 'presets', []),
        ...get(config, 'presets', [])
      ],
      plugins: [
        ...get(babelConfig, 'plugins', []),
        ...get(config, 'plugins', [])
      ]
    }
  }),
  title: 'Syntesis lerna-repo',
  description: 'This is a Syntesis Lerna Monorepository, to work with Frontend components and applications',
  src: '../../components/web',
  indexHtml: './index.html',
  codeSandbox: false,
  port: 43271,
  htmlContext: {
    head: {
      links: [{
        rel: 'stylesheet',
        href: 'https://codemirror.net/theme/dracula.css'
      }]
    }
  },
  themeConfig: {
    mode: 'dark',
    colors: {
      primary: Colors.primary,
      text: Colors.lightBlue,
      sidebarText: Colors.lightBlue
    },
    styles: {
      playground: {
        backgroundColor: Colors.white
      },
      h1: {
        fontSize: Fonts.fontSize.XXXXL,
        fontWeight: Fonts.fontWeight.normal
      }
    }
  }
}
