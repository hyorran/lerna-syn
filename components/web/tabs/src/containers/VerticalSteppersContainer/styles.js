import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default theme => ({
  container: {
    margin: [5],
    backgroundColor: theme.palette.background.paper,
    display: 'grid',
    gridTemplateColumns: '31% 69%',
    height: '100%'
  },
  error: {
    color: Colors.secondary
  },
  stepLabel: {
    '& > *': {
      textAlign: 'left'
    }
  },
  stepLabelActived: {
    '& > span': {
      '& > span': {
        '& > span': {
          color: `${ Colors.primary } !important`
        }
      }
    }
  },
  stepLabelError: {
    '& *': {
      color: `${ Colors.secondary } !important`,
    }
  },
  labelError: {
    color: `${ Colors.secondary } !important`,
    maxWidth: 106,
    fontSize: Fonts.fontSize.SSS
  },
  stepLabelCompleted: {
    '& > span': {
      '& > span': {
        '& > span': {
          color: 'rgba(0, 0, 0, 0.54) !important'
        }
      }
    }
  },

  steppersContainer: {
    borderRight: `1px solid ${ Colors.divider }`,
    marginRight: 2,
    overflowY: 'auto'
  },
  swipeableViewContainer: {
    display: 'flex',
    padding: [0, 10, 25],
    '& > *': {
      width: '100%'
    }
  },
  contentsContainer: {
    display: 'flex',
    flex: 1,

    '& > div': {
      display: 'flex',
      flex: 1,

      '& > .react-swipeable-view-container': {
        display: 'flex',
        width: '100%',
        transition: 'transform 0.25s cubic-bezier(0.15, 0.3, 0.25, 1) 0s, height 0.25s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important',
        // height: 'auto !important',
        '& > div': {
          overflowX: 'hidden !important',
          // overflowY: 'auto !important'
        }
      }
    }
  },
  stepperList: {
    position: 'fixed',
    padding: 20
  },
  stepLabelDisabled: {
    opacity: 0.5
  },
  iconDisabledContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconDisabled: {
    fontSize: 14,
    color: Colors.white
  }
})
