import React from 'react'
import ReactResizeDetector from 'react-resize-detector'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'
import Menu from '../Menu/index'
import Containers from '../Containers'

import styles from './styles'

const DashboardContent = (props) => {
  const {
    classes,
    feature,
    items
  } = props

  return (
    <div>
      <Grid container wrap="wrap">
        <Grid
          item
          xs={ 12 }
          sm={ 12 }
          md={ 3 }
          lg={ 2 }
          className={ classes.menuContainer }
        >
          <ReactResizeDetector
            handleWidth
            render={
              () => {
                const {
                  innerWidth
                } = window

                return (
                  <CardHeightFull
                    setHeight={ innerWidth > 959 }
                    cardContainerClass={ classes.menuContainer }
                  >
                    <Menu
                      feature={ feature }
                      items={ items }
                    />
                  </CardHeightFull>
                )
              }
            }
          />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 12 }
          md={ 9 }
          lg={ 10 }
        >
          <Containers items={ items } />
        </Grid>

      </Grid>
    </div>
  )
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  feature: PropTypes.object.isRequired,
  items: PropTypes.array
}

DashboardContent.defaultProps = {
  items: []
}

export default withStyles(styles)(DashboardContent)
