import flow from 'lodash/fp/flow'
import snakeCase from 'lodash/fp/snakeCase'
import toUpper from 'lodash/fp/toUpper'

/**
 * upperSnakeCase
 * Convert a space separated string to an upper snake cased string
 * e.g. 'cat and dog' -> 'CAT_AND_DOG'
 * @param string
 *
 * */
const upperSnakeCase = string => flow(
  snakeCase,
  toUpper
)(string)

export default upperSnakeCase
