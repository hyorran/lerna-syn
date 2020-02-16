export default theme => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'column'
  },
  buttonsContainer: {
    display: 'inline-flex'
  },
  paper: {
    ...theme.mixins.gutters(),
    margin: 20,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})
