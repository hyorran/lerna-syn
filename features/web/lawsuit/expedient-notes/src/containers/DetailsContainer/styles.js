import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  footerContainer: {
    padding: [16, 0],
    textAlign: 'right'
  },
  paddingModal: {
    padding: 10
  },
  typography: {
    marginTop: 30
  },
  typographyMargin: {
    margin: [0, 0, 7, 0]
  },
  infoIcon: {
    position: 'relative',
    color: Colors.secondary,
    top: 5,
    marginRight: 4
  },
  '@global': {
    'p': {
      marginBlockStart: 0,
      marginBlockEnd: '4px !important'
    }
  }
})
