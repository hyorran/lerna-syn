import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  container: {
    margin: 10
  },
  title: {
    padding: [0, 10],
    color: Colors.primary
  },
  indicatorsContainer: {
    display: 'inline-flex',
    flexWrap: 'wrap'
  },
  header: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerIcon: {
    color: Colors.primary
  }
})
