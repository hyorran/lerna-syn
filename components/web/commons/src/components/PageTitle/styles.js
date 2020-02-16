import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  container: {
    display: 'inline-flex',
    width: '100%',
    padding: [5, 0]
  },
  containerTitle: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%'
  },
  containerHelpIcons: {
    display: 'inline-flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  containerWikiHelp: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    margin: 0
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  helpBtn: {
    marginLeft: 'auto'
  }
})
