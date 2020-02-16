import Colors from '@syntesis/c-styles/src/styles/Colors'
import styleButton from '../Button/styles'

export default (theme) => {
  const {
    success,
    warning,
    error,
    generic,
    secondaryButton,
    secondaryInverseButton
  } = styleButton(theme)

  return {
    root: {
      position: 'relative'
    },
    iconButtonMarginVertical: {
      marginTop: 2.5,
      marginBottom: 2.5
    },
    iconButtonMarginHorizontal: {
      marginLeft: 2.5,
      marginRight: 2.5
    },
    btnCreate: {
      background: Colors.generic.main,
      color: Colors.generic.text,
      '&:hover': {
        background: Colors.generic.hover
      }
    },
    btnShadow: {
      boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.1), 0px 1px 10px 0px rgba(0, 0, 0, 0.06)',
    },
    withOpacity: {
      opacity: 0.5,
      '&:hover': {
        opacity: 1,
        transition: 'opacity 0.1s'
      }
    },
    spanIconButton: {
      display: 'flex'
    },
    mini: {
      padding: 4,
    },
    btnTransparentWhite: {
      '&:not(disabled)': {
        backgroundColor: Colors.transparent,
        color: Colors.white50,
        '&:hover': {
          color: Colors.white75
        }
      }
    },
    none: {
      padding: 0,
    },
    btnTable: {
      background: 'none',
      color: Colors.primary,
      padding: [0, 4],
      opacity: 0.35,
      '&:hover': {
        background: 'none',
        color: Colors.secondary
      }
    },
    btnLight: {
      color: Colors.primary,
      backgroundColor: Colors.lightBlue,
      '&:hover': {
        backgroundColor: Colors.lightBlueHover
      }
    },
    colorSecondary: {
      color: `${ Colors.secondary } !important`
    },
    success,
    warning,
    error,
    generic,
    secondaryButton,
    secondaryInverseButton
  }
}
