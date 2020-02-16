import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  container: {
    '& button': {
      color: Colors.white,
      width: '100%',
      margin: 2,
      background: Colors.primary
    },
    '& button:hover': {
      color: Colors.primary,
      backgroundColor: Colors.lightBlue
    }
  }
})
