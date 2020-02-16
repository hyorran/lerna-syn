import Colors from '@syntesis/c-styles/src/styles/Colors'

export default () => ({
  datagridContainer: {
    flex: 1,
    marginTop: 10
  },
  pageT: {
    width: 'auto',
    float: 'left',
    color: Colors.primary,
    margin: 'auto'
  },
  cardHeader: {
    width: '100%'
  },
  dateRangePicker: {
    width: '40%',
    margin: [0, 0, 0, 20],
    float: 'left'
  },
  details: {
    padding: 0,
    backgroundColor: Colors.lightGrey
  },
  container: {
    display: 'flex',
    flex: 1,
    color: Colors.yellow
  }
})
