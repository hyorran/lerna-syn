import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '99%',
    flex: 1,
    backgroundColor: Colors.grey
  },
  card: {
    maxWidth: 600,
    padding: 0
  },
  media: {
    height: 400
  },
  contentContainer: {
    paddingBottom: '0 !important'
  },
  synsuiteLogoContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  synsuiteLogo: {
    width: 150
  }
})
