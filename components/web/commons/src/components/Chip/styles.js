import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  chip: {
    display: 'flex',
    flex: 1,
    margin: 3
  },
  chipWithTooltip: {
    cursor: 'help'
  },
  tooltip: {
    backgroundColor: Colors.text,
    color: Colors.white,
    fontSize: Fonts.fontSize.SS,
    border: `1px solid ${ Colors.text }`
  },
  label: {
    width: '100%',
    marginTop: -1
  },
  labelContainer: {
    display: 'inline-flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [0, 10]
  },
  labelValue: {
    paddingLeft: 15
  }
})
