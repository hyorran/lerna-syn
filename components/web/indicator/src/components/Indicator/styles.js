import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    margin: 10
  },
  header: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 28
  },

  headerIcon: {
    width: 20,
    height: 20
  },
  title: {
    textTransform: 'uppercase',
    fontSize: Fonts.fontSize.SS,
  },
  value: {
    paddingTop: 3
  },
  loader: {
    margin: [5, 0, 5, 4]
  },
  danger: {
    backgroundColor: Colors.error.main,
    '& $headerIcon': {
      color: Colors.secondaryLight
    },
    '& $title': {
      color: Colors.secondaryLight
    },
    '& $value': {
      color: Colors.secondaryLight
    },
    '& $loader': {
      color: Colors.secondaryLight
    }
  },
  warning: {
    backgroundColor: Colors.secondaryLight,
    '& $headerIcon': {
      color: Colors.darkYellow
    },
    '& $title': {
      color: Colors.darkYellow
    },
    '& $value': {
      color: Colors.darkYellow
    },
    '& $loader': {
      color: Colors.darkYellow
    }
  },
  normal: {
    backgroundColor: Colors.lightBlue,
    '& $headerIcon': {
      color: Colors.primary
    },
    '& $title': {
      color: Colors.primary
    },
    '& $value': {
      color: Colors.primary
    },
    '& $loader': {
      color: Colors.primary
    }
  },
  success: {
    backgroundColor: Colors.lightGreen,
    '& $headerIcon': {
      color: Colors.darkGreen
    },
    '& $title': {
      color: Colors.darkGreen
    },
    '& $value': {
      color: Colors.darkGreen
    },
    '& $loader': {
      color: Colors.darkGreen
    }
  },
  actions: {
    display: 'flex',
    height: '1rem',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  expandButton: {
    padding: 0,
    // margin: 0,
    borderRadius: 0
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  expand: {
    transform: 'rotate(0deg)',
    transitionDuration: '1s'
  }
})
