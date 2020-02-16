export default () => ({
  formContainer: {
    marginTop: 0
  },
  footerContainer: {
    padding: [16, 0],
    textAlign: 'right'
  },
  chipContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    marginTop: 15,
    '& > div': {
      flex: 1,
      width: '100%',
      // '& > span > div': {
      //   justifyContent: 'flex-start'
      // }
    }
  }
})
