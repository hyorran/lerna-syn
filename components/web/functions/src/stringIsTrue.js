import toString from 'lodash/toString'

const stringIsTrue = str => (
  str === true ||
  str === toString(true) ||
  str === 1 ||
  str === toString(1)
)

export default stringIsTrue
