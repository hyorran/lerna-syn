const Index = () => {
  const primary = '#09536f'
  const secondary = '#fa5239'

  return {
    primary,
    secondary,
    secondaryLight: '#FFE3DB',

    // O usuário espera que links sejam azuis
    linkBlue: '#0067C5',

    middleGrey: '#D2D2D2',
    lightGrey: '#f5f5f5',
    lightGreyAvatar: '#ece9e9',
    lightPurple: '#ECEFFC',
    titleLightGrey: '#d8d8d8',

    lightYellow: '#ffeeb6',
    darkYellow: '#383818',

    divider: 'rgba(0, 0, 0, 0.12)',

    inputLabel: 'rgba(0, 0, 0, 0.54)',

    inputIcon: 'hsl(0, 0%, 75%)',
    inputIconDivisor: 'hsl(0, 0%, 80%)',

    white50: 'rgba(255, 255, 255, 0.5)',
    white75: 'rgba(255, 255, 255, 0.75)',

    secondaryVariants: {
      hover: '#e24d36',
      lightHover: '#ffd7c6'
    },

    // Cores de Feedback
    success: {
      main: '#4caf50',
      text: '#FFF',
      hover: '#339637'
    },
    error: {
      main: '#d32f2f',
      text: '#FFF',
      hover: '#BA1616'
    },
    warning: {
      main: '#ffa000',
      text: '#FFF',
      hover: '#E68700'
    },
    generic: {
      main: primary,
      text: '#FFF',
      hover: '#003A56'
    },
    transparent: 'transparent',
    white: '#fff',
    grey: '#dbddde',
    text: '#333',
    muted: '#848484',

    inputDisabled: 'rgba(0, 0, 0, 0.38)',

    littleLightBlue: '#e3ecf1',
    lightBlue: '#c6dfec',
    lightBlueHover: '#a0b8c5',
    darkGreen: '#132a13',
    lightGreen: '#c4e1cc',
    greenCreate: '#4CAF50',
    greenDisabled: '#2E7D32',
    redDeleted: '#F44336',
    redDisabled: '#C62828',

    // Cores do background do avatar
    avatarLetterColor: {
      colorOne: primary,
      colorTwo: secondary,
      colorThree: '#003f56',
      colorFour: '#ff7965',
      colorFive: '#0379a5',
      colorSix: '#bd3b27',
      colorSeven: '#1f9ece',
      colorEight: '#862314',
      colorNine: '#285063',
      default: '#bdbdbd'
    }

  }
}

export default Index()
