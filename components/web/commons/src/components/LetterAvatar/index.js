import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'

import Colors from '@syntesis/c-styles/src/styles/Colors'
import styles from './styles'

function LetterAvatar(props) {
  const {
    classes,
    value,
    letter,
    tooltip
  } = props

  const backgroundStyle = {
    backgroundColor: Colors.avatarLetterColor.default
  }

  switch (value) {
    case 1:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorOne
      break
    case 2:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorTwo
      break
    case 3:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorThree
      break
    case 4:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorFour
      break
    case 5:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorFive
      break
    case 6:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorSix
      break
    case 7:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorSeven
      break
    case 8:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorEight
      break
    case 9:
      backgroundStyle.backgroundColor = Colors.avatarLetterColor.colorNine
      break
    default:
      break
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Tooltip
        title={ `${ tooltip !== null && tooltip !== '' ? tooltip : letter }` }
        placement="right"
      >
        <Avatar className={ classes.avatar } style={ backgroundStyle }>{ letter }</Avatar>
      </Tooltip>
    </Grid>
  )
}

LetterAvatar.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** Displayed inside the component. */
  letter: PropTypes.string,
  /** - */
  tooltip: PropTypes.string,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

LetterAvatar.defaultProps = {
  letter: '',
  tooltip: '',
  value: ''
}

export default withStyles(styles)(LetterAvatar)
export { LetterAvatar as ComponentWithProps }
