import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

import styles from './styles'

function ImageSquareAvatar(props) {
  const {
    classes,
    value,
    src,
    tooltip
  } = props;

  return (
    <Grid container justify="center" alignItems="center">
      <Tooltip
        title={ `${ tooltip !== null && tooltip !== '' ? tooltip : value }` }
        placement="right"
      >
        <Avatar className={ classes.avatar } src={ src } />
      </Tooltip>
    </Grid>
  );
}

ImageSquareAvatar.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  src: PropTypes.string,
  /** - */
  tooltip: PropTypes.string,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

ImageSquareAvatar.defaultProps = {
  src: '',
  tooltip: '',
  value: ''
}

export default withStyles(styles)(ImageSquareAvatar)
export { ImageSquareAvatar as ComponentWithProps }
