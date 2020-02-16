import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  container: {
    display: 'inline-flex',
    width: '100%',
    padding: [5, 0],
    minHeight: 68
  },
  containerTitle: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%'
  },
  containerWikiHelp: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  helpIcon: {
    backgroundColor: Colors.white,
    '&:hover': {
      backgroundColor: Colors.white
    }
  },
  avatar: {
    width: 60,
    marginRight: 10,
    height: 60,
    backgroundColor: Colors.lightGreyAvatar
  },
  avatarIcon: {
    width: 32,
    height: 32,
    color: Colors.primary
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  subtitle: {
    margin: 0,
    fontSize: Fonts.fontSize.SSS,
    color: Colors.lightBlue
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: Fonts.fontSize.SS,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.white
  },
  helpBtn: {
    marginLeft: 'auto'
  }
})
