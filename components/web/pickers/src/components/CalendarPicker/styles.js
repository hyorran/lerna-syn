import 'flatpickr/dist/themes/light.css'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  '@global': {
    '.flatpickr-calendar': {
      fontFamily: Fonts.fontFamily
    },
    '.flatpickr-wrapper': {
      display: 'flex',
      '& div': {
        flex: 1
      }
    }
  }
})
