import flow from 'lodash/fp/flow'
import deburr from 'lodash/fp/deburr'
import words from 'lodash/fp/words'
import mapFP from 'lodash/fp/map'
import first from 'lodash/first'
import last from 'lodash/last'
import toUpperCase from 'lodash/toUpper'

/**
 * userAvatarByName
 * Convert a name string to a two letter upper cased string
 * e.g. 'Super Admin User' => 'SU'
 *
 * */
const userAvatarByName = (string) => {
  const str = flow(
    deburr,
    words,
    mapFP(s => s.charAt(0))
  )(string)

  const firstLetter = first(str)
  const lastLetter = last(str)

  return toUpperCase([firstLetter, lastLetter].join(''))
}

export default userAvatarByName
