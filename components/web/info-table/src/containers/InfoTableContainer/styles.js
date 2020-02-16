export default theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: 3
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    },
  },
  cell: {
    flexWrap: 'wrap',
    whiteSpace: 'pre-wrap'
  }
})
