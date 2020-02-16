import React from 'react'
import forEach from 'lodash/forEach'
import isObject from 'lodash/isObject'
import split from 'lodash/split'
import stringifyValue from './stringifyValue'

const eachJsonToString = (json, characterToReplace = '', characterToBeReplaced = '') => {
  const result = []
  let count = 1

  const func = obj => forEach(obj, (value, key) => {
    if (isObject(value)) {
      func(value)
    } else {
      value = split(value, characterToReplace).join(characterToBeReplaced)
      const myValue = stringifyValue(value)
      result.push(<p key={ count += 1 }><b>{ key }</b>: { myValue || '-' }</p>)
      result.push(<br key={ count += 1 } />)
    }
  })

  func(json)

  return result
}

export default eachJsonToString
