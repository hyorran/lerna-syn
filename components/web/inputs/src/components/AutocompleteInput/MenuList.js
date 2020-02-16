import React, { Children } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { VariableSizeList as List } from 'react-window'

const GROUP_HEADER_HEIGHT = 13
const ITEM_HEIGHT = 46

const MenuList = (props) => {
  const { options, getValue } = props
  const [value] = getValue()

  const initialOffset = options.indexOf(value) * (ITEM_HEIGHT - 1)

  const children = Children.toArray(props.children)

  const getOptionSize = (option) => {
    if (get(option, 'options', null)) {
      return (option.options.length * ITEM_HEIGHT) + GROUP_HEADER_HEIGHT
    }
    return ITEM_HEIGHT
  }

  const getItemSize = i => getOptionSize(options[i])

  const totalHeight = options.reduce((height, option) => height + getOptionSize(option), 0)

  const estimatedItemSize = totalHeight / options.length

  return (
    <List
      height={ Math.min(totalHeight, 138) }
      itemCount={ children.length }
      itemSize={ getItemSize }
      estimatedItemSize={ estimatedItemSize }
      initialScrollOffset={ initialOffset }
    >
      {
        ({ index, style }) => (
          <div style={ style }>
            { children[index] }
          </div>
        )
      }
    </List>
  )
}

MenuList.propTypes = {
  getValue: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  options: PropTypes.array
}

MenuList.defaultProps = {
  options: []
}

export default MenuList
