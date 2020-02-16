import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  container: {
    wordWrap: 'break-word',
    '& p': {
      fontFamily: Fonts.fontFamily,
      fontSize: Fonts.fontSize.S,
      color: Colors.primary,
      margin: 0,
      padding: 2
    }
  }
})
