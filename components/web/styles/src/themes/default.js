import { createMuiTheme } from '@material-ui/core/styles'
import Colors from '../styles/Colors'
import Fonts from '../styles/Fonts'

export const themeJson = {
  custom: {
    widthGridAnimation: 110,
    classes: {
      gridWidthAnimation: {
        transition: 'max-width 80ms ease-in, flex-basis  80ms ease-out'
      }
    }
  },
  palette: {
    primary: {
      main: Colors.primary
    },
    secondary: {
      main: Colors.secondary
    }
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: Fonts.fontFamily
  },
  overrides: {
    MuiModal: {
      root: {
        zIndex: 1400,
        '& a[download]': {
          textDecoration: 'none'
        },
      }
    },
    MuiTooltip: {
      popper: {
        zIndex: 999999
      },
      tooltip: {
        margin: '3px !important',
        backgroundColor: Colors.lightGrey,
        color: Colors.text,
        border: `1px solid ${ Colors.lightBlue }`
      }
    },
    MuiCard: {
      root: {
        padding: 10,
        margin: 5
      }
    },
    MuiSnackbar: {
      root: {
        zIndex: 999999
      }
    },
    MuiSnackbarContent: {
      root: {
        display: 'grid',
        gridTemplateColumns: 'auto auto'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      }
    },
    MuiDialog: {
      paperScrollPaper: {
        overflowY: 'visible',
        transition: 'height 1s'
      }
    },
    MuiDialogContent: {
      root: {
        // overflowY: 'visible'
      }
    },
    // default.css no Synsuite diminuia a área clicável do input
    MuiPrivateSwitchBase: {
      input: {
        width: '100% !important'
      }
    },
    MuiTypography: {
      body2: {
        fontSize: Fonts.fontSize.SS
      }
    },
    MuiInput: {
      formControl: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',

        '& > div:first-child': {
          display: 'flex',
          flex: 1
        }
      }
    }
  }
}

export default () => createMuiTheme(themeJson)
