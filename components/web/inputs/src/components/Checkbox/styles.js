import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  lightRoot: {
    color: Colors.lightBlue,
    padding: 6
  },
  root: {
    padding: 6
  },
  lightColorPrimary: {
    color: Colors.lightBlue
  },
  lightChecked: {
    color: `${ Colors.lightBlue } !important`
  },
  containerInlineFormControl: {
    marginTop: 15,
    marginBottom: 3
  },
  labelInlineContainer: {
    marginLeft: 0,
    marginRight: 0,
    padding: [5, 0]
  },
  labelInlineLabel: {
    display: 'flex',
    flex: 1,
    color: Colors.inputLabel,
    fontSize: Fonts.fontSize.M
  }
})
