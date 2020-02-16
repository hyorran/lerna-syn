import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 5
  },
  paginationContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content max-content',
    gridColumnGap: '30px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > div': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  btnNavigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1
  },
  select: {
    paddingTop: 3,
    padding: 0,
    margin: 0,
    height: '24px'
  },
  selectInput: {
    padding: 0,
    fontSize: Fonts.fontSize.SS,
    width: '100%',
    height: '100%'
  },
  rowsCounter: {
    padding: 4,
    fontSize: Fonts.fontSize.S,
    textAlign: 'center',
    height: '100%'
  },
  pagination: {
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    fontSize: Fonts.fontSize.SS,
    height: '24px'
  },
  buttons: {
    border: 'none',
    padding: 0,
    boxShadow: 'none'
  },
  pageInformation: {
    margin: 0,
    padding: 0,
    height: '24px'
  },
  pageJump: {
    padding: 0,
    width: '5%',
    height: '100%'
  },
  currentPage: {
    padding: 0,
    fontSize: Fonts.fontSize.SS,
    width: '20px',
    height: '24px',
    '& > input': {
      textAlign: 'center'
    }
  },
  totalPages: {
    padding: 0,
    height: '100%'
  },
  pageSizeOptions: {
    padding: 0,
    height: '100%'
  }
})
