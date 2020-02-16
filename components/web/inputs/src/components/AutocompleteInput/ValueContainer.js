import React from 'react'
import PropTypes from 'prop-types'

const ValueContainer = (props) => {
  const {
    selectProps: {
      classes
    },
    children
  } = props

  return (
    <div className={ classes.valueContainer }>
      { children }
    </div>
  )
}

ValueContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired,
  selectProps: PropTypes.shape({
    classes: PropTypes.object
  })
}

ValueContainer.defaultProps = {
  selectProps: {
    classes: {}
  }
}

export default ValueContainer
