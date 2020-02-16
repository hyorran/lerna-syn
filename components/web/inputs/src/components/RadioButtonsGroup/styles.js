import Fonts from '@syntesis/c-styles/src/styles/Fonts'
import Colors from '@syntesis/c-styles/src/styles/Colors'

export default theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    display: 'flex',
    flex: 1,
    width: '100%'
  },
  group: {
    margin: `${ theme.spacing.unit }px 0`,
  },
  inlineRadioButtonGroup: {
    margin: [3, 0, -5]
  },
  inlineRadioButtonGroupLabel: {
    fontSize: Fonts.fontSize.SS,
    color: Colors.helperText
  },
  inlineRadioButtonGroupGroup: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
