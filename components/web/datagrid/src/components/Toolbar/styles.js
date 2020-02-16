export default theme => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center'
    // flex: 1
  },
  toolbarContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`@media (max-width: ${ 767 }px)`]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }
  },
  btn: {
    padding: 10
  },
  activatedFiltersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  chip: {
    margin: theme.spacing.unit,
  },
  toolbarFilterContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  clearFilter: {
    marginRight: theme.spacing.unit * 2
  },
  clearFilterIcon: {
    marginTop: 10
  },
  periodContainer: {
    margin: [0, 10],
    width: 300
  }
})
