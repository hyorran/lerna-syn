import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const TextUnderCellComponent = (props) => {
  let {
    text,
    subText
  } = props

  const { wrapText } = props

  let newSubText = ''

  if (isEmpty(text)) {
    text = '-'
  }

  if (isEmpty(subText)) {
    subText = '-'
  } else if (subText.length > wrapText) {
    newSubText = `${ subText.substring(0, wrapText - 1) }...`
  }

  const styles = {
    whiteSpace: 'pre-line',
    textAlign: 'center'
  }

  return (
    isEmpty(newSubText)
      ? (
        <Typography
          noWrap
          style={ styles }
        >
          {
            `${ text } \n ${ subText }`
          }
        </Typography>
      )
      : (
        <Tooltip
          title={ subText }
          placement="right"
        >
          <Typography
            noWrap
            style={ styles }
          >
            {
              `${ text } \n ${ newSubText }`
            }
          </Typography>
        </Tooltip>
      )
  )
}

TextUnderCellComponent.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
  wrapText: PropTypes.number
};

TextUnderCellComponent.defaultProps = {
  text: '',
  subText: '',
  wrapText: 50
};

export default TextUnderCellComponent
export { TextUnderCellComponent as ComponentWithProps }
