import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  featureTitleContainer: {
    padding: [0, 10],
    backgroundColor: Colors.primary
  },
  list: {
    padding: 0
  },
  listItem: {
    padding: [7, 10],
    cursor: 'pointer'
  },
  listItemText: {
    color: Colors.primary,
    fontSize: Fonts.fontSize.SS
  },
  listItemSelected: {
    backgroundColor: `${ Colors.secondaryLight } !important`,
    '& $listItemText': {
      color: Colors.secondary
    }
  },
  keyboardArrow: {
    color: Colors.secondary
  }
})
