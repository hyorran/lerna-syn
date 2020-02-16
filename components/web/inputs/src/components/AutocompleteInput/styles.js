import { emphasize } from '@material-ui/core/styles/colorManipulator'
import { Colors } from '@syntesis/c-styles'

export default theme => ({
  root: {
    flexGrow: 1,
    display: 'block !important',
    marginTop: 1,
    marginBottom: 4
  },
  input: {
    display: 'flex',
    padding: 0,
    '& div[aria-hidden=true]': {
      padding: [4, 8]
    }
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Se der erro, comentar esta linha
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${ theme.spacing.unit / 2 }px ${ theme.spacing.unit / 4 }px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${ theme.spacing.unit }px ${ theme.spacing.unit * 2 }px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    fontSize: 16
    // color: 'red'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,

    // fix synsuite absolute .main-container
    top: process.env.NODE_ENV === 'production' ? -46 : undefined,
    left: process.env.NODE_ENV === 'production' ? -46 : 0,
    right: process.env.NODE_ENV === 'production' ? 46 : 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  helperText: {
    marginTop: 0,
    display: 'flex',
    alignItems: 'center'
  },
  inputDisabled: {
    color: Colors.inputDisabled
  }
})
