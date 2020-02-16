import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  rootExpanded: {
    width: 'calc(100% - 14px)',
    margin: 7,
    backgroundColor: Colors.white,
    borderRadius: 0,
    transition: 'width 0.3s, height 0.3s all ease-in-out',
    '&:first-child': {
      marginTop: 7
    },
    '&:last-child': {
      marginBottom: 7
    },
  },
  panelHeader: {
    fontSize: Fonts.fontSize.M,
    color: Colors.primary,
    width: '100%',
    height: '100%'
  },
  panelSummary: {
    '&:hover': {
      backgroundColor: Colors.primary,
      boxShadow: 'none',
      transition: '0.18s all ease-in-out',
      '& p': {
        color: Colors.generic.text
      }
    },
    borderTop: `1px solid ${ Colors.grey }`
  },
  panelSelected: {
    backgroundColor: Colors.primary,
    boxShadow: 'none',
    transition: '0.3s all ease-in-out',
  },
  panelSelectedTitle: {
    color: Colors.generic.text,
    fontSize: Fonts.fontSize.L,
    fontWeight: Fonts.fontWeight.normalBold,
    transition: '0.1s all',
    paddingLeft: 4
  },
  panelDetails: {
    width: 'calc(100%-40px)',
    height: '100%',
    padding: 10
  },
  panelInsideDetails: {
    width: '100%',
    height: '100%',
    padding: 4
  }
})
