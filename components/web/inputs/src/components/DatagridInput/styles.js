import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default theme => ({
  formControl: {
    minWidth: 120,
    display: 'flex !important',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  helperText: {
    marginTop: 4
  },
  margin: {
    marginTop: 8,
    marginBottom: 4
  },
  inputEmpty: {
    opacity: 0
  },
  input: {
    width: '100%',
    border: 'none',
    fontSize: Fonts.fontSize.M,
    padding: [5, 0, 8],
    '&:focus': {
      outline: 0
    }
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  }
})
