import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import LinearLoader from '@syntesis/c-loaders/src/components/Linear'
import InlineSVG from 'svg-inline-react'
import image from '../../assets/building-webpage.gif'
import synsuiteLogo from '../../assets/synsuite.svg'

import styles from './styles'

const PageUnderConstruction = (props) => {
  const {
    classes
  } = props

  return (
    <Card className={ classes.container }>
      <Card className={ classes.card }>
        <CardMedia
          className={ classes.media }
          image={ image }
          title="Página em construção"
        />
        <LinearLoader visible loading />
        <CardContent classes={ { root: classes.contentContainer } }>
          <Typography gutterBottom variant="h5" component="h2">
            Página em construção...
          </Typography>
          <Typography variant="body1" component="p">
            Estamos trabalhando nessa rotina e em breve ela estará disponível!
          </Typography>
          <Typography variant="body1" component="p">
            Não se preocupe, você será comunicado quando essa página estiver online!
          </Typography>
          <div className={ classes.synsuiteLogoContainer }>
            <div className={ classes.synsuiteLogo }>
              <InlineSVG src={ synsuiteLogo } />
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  )
}

PageUnderConstruction.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PageUnderConstruction)
export { PageUnderConstruction as ComponentWithProps }
