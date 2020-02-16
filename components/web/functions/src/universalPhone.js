import flow from 'lodash/fp/flow'
import split from 'lodash/fp/split'
import join from 'lodash/fp/join'

const universalPhone = (region, phone) => `${ region }${ flow(
  split('('),
  join(''),
  split(')'),
  join(''),
  split('-'),
  join(''),
  split(' '),
  join('')
)(phone) }`

export default universalPhone
