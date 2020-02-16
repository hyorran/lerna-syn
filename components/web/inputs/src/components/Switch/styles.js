import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerFormControl: {
    marginTop: 10
  },
  lightRoot: {
    color: Colors.lightBlue,
    padding: 0
  },
  root: {
    padding: 0
  },
  lightColorPrimary: {
    color: Colors.lightBlue
  },
  lightChecked: {
    color: `${ Colors.lightBlue } !important`
  },
  labelInlineContainer: {
    marginLeft: 0
  },
  labelInlineLabel: {
    display: 'flex',
    flex: 1,
    color: Colors.inputLabel,
    fontSize: Fonts.fontSize.M
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: Colors.lightGrey,
      '& + $iOSBar': {
        backgroundColor: Colors.primary,
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSDisabled: {
    '& + $iOSBar': {
      backgroundColor: `${ Colors.lightBlue } !important`
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: Colors.lightGrey,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
  dividerBottom: {
    marginTop: -4
  },
  helperText: {
    marginTop: 4,
    display: 'flex',
    alignItems: 'center'
  }
})
