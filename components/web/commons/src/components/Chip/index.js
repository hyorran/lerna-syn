import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import ChipMui from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import OpenInNewIcon from '@syntesis/c-icons/src/OpenInNewIcon'

import styles from './styles'

const Chip = (props) => {
  const {
    classes,
    label,
    value,
    tooltip,
    externalLinkUrl,
    textAsError,
    ...otherProps
  } = props

  const hasTooltip = !isEmpty(tooltip)

  let chipProps = {}

  if (!isEmpty(externalLinkUrl)) {
    chipProps = {
      ...chipProps,
      clickable: true,
      onDelete: () => window.open(externalLinkUrl, '_blank'),
      deleteIcon: <OpenInNewIcon />
    }
  }

  let response = (
    <ChipMui
      label={ (
        <div className={ classes.labelContainer }>
          <div>
            <b>{ label }</b>:
          </div>
          <div className={ classes.labelValue }>
            {
              isEmpty(value)
                ? '-'
                : (
                  <Typography color={ textAsError ? 'secondary' : undefined }>
                    { value }
                  </Typography>
                )
            }
          </div>
        </div>
      ) }
      classes={ {
        label: classes.label
      } }
      className={ [classes.chip, hasTooltip ? classes.chipWithTooltip : null].join(' ') }
      { ...chipProps }
      { ...otherProps }
    />
  )

  if (hasTooltip) {
    response = (
      <Tooltip title={ tooltip } classes={ { tooltip: classes.tooltip } }>
        { response }
      </Tooltip>
    )
  }

  return response
}

Chip.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** Internal label of the component. */
  label: PropTypes.string.isRequired,
  /** Value inside of the component. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  /** Text or element displayed inside the tooltip. */
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  textAsError: PropTypes.bool,
  /** Can be used to display an link inside the component. */
  externalLinkUrl: PropTypes.string
}

Chip.defaultProps = {
  value: null,
  tooltip: null,
  textAsError: false
}

export default withStyles(styles)(Chip)

export { Chip as ComponentWithProps }
