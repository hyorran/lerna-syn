export default () => ({
  container: {
    display: 'flex',
    height: '100%',
    '& > div': {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  loader: {
    position: 'relative',
    flex: 1
  },
  hide: {
    display: 'none'
  }
})
