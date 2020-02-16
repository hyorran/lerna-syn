import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default theme => ({
  '@global': {
    '.mw-parser-output': {
      padding: [0, 30],
      fontFamily: theme.typography.fontFamily,

      '& > h2': {
        display: 'none'
      },
      '& > p': {
        fontSize: Fonts.fontSize.S,
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        lineHeight: '1.35em',

        '& big': {
          fontSize: Fonts.fontSize.M,
          lineHeight: '1.6em'
        }
      }
    }
  },
  container: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.muted
  },
  title: {
    justifyContent: 'center'
  }
})
