import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  avatar: {
    margin: 0,
    color: Colors.white,
    width: 40,
    fontSize: 12,
    borderRadius: 0,
    fontWeight: 'bold',
    '& img': {
      height: 'auto'
    }
  }
})

