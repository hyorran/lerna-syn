// import Colors from '@syntesis/c-styles/src/styles/Colors'

import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: 7
  },
  stepContent: {
    borderLeft: '1px solid #bdbdbd',
    marginTop: 3,
    paddingRight: 0
  },
  childContainer: {
    padding: [5, 0, 10]
  },
  stepIcon: {
    '&:not(disabled)': {
      transition: 'all .1s',
      backgroundColor: Colors.primary,
      color: Colors.white,
      '&:hover': {
        transition: 'all .1s',
        backgroundColor: Colors.secondaryVariants.lightHover,
        color: Colors.secondary
      }
    },
    '& svg': {
      fontSize: Fonts.fontSize.L
    }
  },
  allSteppersContainer: {
    marginBottom: 5,
    marginLeft: 0
  },
  disabledRemoveText: {
    fill: Colors.transparent
  },
  btnAdd: {
    marginRight: 0,
    marginLeft: 10
  },
  btnAddMargin: {
    marginTop: 10
  }
})
