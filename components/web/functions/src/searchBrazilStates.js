import find from 'lodash/find'
import get from 'lodash/get'
import getBrazilStates from '../src/getBrazilStates'

const searchBrazilStates = (state) => {

  const states = getBrazilStates

  const response = find(states, ({ value }) => value === state)

  return get(response, 'label', '-')
}

export default searchBrazilStates
