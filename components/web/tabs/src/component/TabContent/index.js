import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const TabContent = (props) => {
  const { children, dir } = props
  return (
    <Typography
      component="div"
      dir={ dir }
      style={ { padding: 8 * 3 } }
    >
      { children }
    </Typography>
  )
}

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

export default TabContent
