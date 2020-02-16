export default (theme) => {
  const {
    custom: {
      classes: {
        gridWidthAnimation
      }
    }
  } = theme

  return {
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'flex-start',
    },
    datagridContainer: {
      flex: 1,
      marginTop: 10
    },
    cardRightContainer: {
      padding: 0
    },
    gridWidthAnimation
  }
}
