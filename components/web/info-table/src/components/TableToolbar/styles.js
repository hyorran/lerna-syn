import { lighten } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    minHeight: 0,
    transition: 'all .15s',
  },
  hide: {
    height: 0,
    overflow: 'hidden',
    color: 'transparent',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        height: 60,
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85)
      }
      : {
        height: 60,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  },
})
