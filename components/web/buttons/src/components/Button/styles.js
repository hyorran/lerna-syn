import Fonts from '@syntesis/c-styles/src/styles/Fonts'
import Colors from '@syntesis/c-styles/src/styles/Colors'

export default theme => ({
  btn: {
    padding: '5px 20px',
    fontSize: Fonts.fontSize.SS,
    minHeight: 0,
    whiteSpace: 'nowrap',
    lineHeight: '2em',
    fontWeight: 'bold',
    marginRight: 8,
    // '& svg': {
    //   marginRight: 5
    // }
  },
  btnChildren: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMargin: {
    marginRight: 0
  },
  wrap: {
    whiteSpace: 'pre-wrap'
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  btnCreate: {
    color: Colors.white,
    backgroundColor: Colors.greencreate,
    '&:hover': {
      backgroundColor: Colors.greencreatehover,
    }
  },
  btnCreateTextDisabled: {
    color: `${ Colors.greenDisabled } !important`
  },
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  dropIcon: {
    padding: 0,
    lineHeight: 0
  },

  iconLeft: {
    marginRight: theme.spacing.unit,
  },
  iconRight: {
    marginLeft: theme.spacing.unit,
  },


  success: {
    '&:not(disabled)': {
      backgroundColor: Colors.success.main,
      color: Colors.success.text,
      '&:hover': {
        backgroundColor: Colors.success.hover
      }
    }
  },
  error: {
    '&:not(disabled)': {
      backgroundColor: Colors.error.main,
      color: Colors.error.text,
      '&:hover': {
        backgroundColor: Colors.error.hover
      }
    }
  },
  warning: {
    '&:not(disabled)': {
      backgroundColor: Colors.warning.main,
      color: Colors.warning.text,
      '&:hover': {
        backgroundColor: Colors.warning.hover
      }
    }
  },
  generic: {
    '&:not(disabled)': {
      backgroundColor: Colors.generic.main,
      color: Colors.generic.text,
      '&:hover': {
        backgroundColor: Colors.generic.hover
      }
    }
  },
  secondaryButton: {
    '&:not(disabled)': {
      backgroundColor: Colors.secondary,
      color: Colors.white,
      '&:hover': {
        backgroundColor: Colors.secondaryVariants.hover
      }
    }
  },
  secondaryInverseButton: {
    '&:not(disabled)': {
      backgroundColor: Colors.secondaryLight,
      color: Colors.secondary,
      '&:hover': {
        backgroundColor: Colors.secondaryVariants.lightHover
      }
    }
  }
})
