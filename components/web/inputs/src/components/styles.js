export default () => ({
  itemContainer: {
    maxWidth: 256,
    margin: [20, 10, 10],
    [`@media(max-width: ${ 815 })`]: {
      maxWidth: '100%'
    },
  },
  hint: {
    color: '#696969',
  }
})
