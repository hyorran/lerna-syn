import React, { Component, Suspense } from 'react'
import ReactDOM from 'react-dom'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { auth } from '@syntesis/s-csharp-microservices'
import { withStores } from '@syntesis/c-stores-provider'
import CircularLoader from '@syntesis/c-loaders/src/components/Circular'
import CardHeightFull from '@syntesis/c-commons/src/components/CardHeightFull'

import styles from './styles'

@inject('auth')
@observer
class Block extends Component {
  constructor(props) {
    super(props)

    this.oauth = this.oauth.bind(this)
  }

  componentDidMount() {
    this.oauth()
  }

  async oauth() {
    const {
      params,
      auth: {
        hasExpired,
        saveTokens,
        saveHost,
        finishLoad,
        refreshToken
      }
    } = this.props

    /*
    * Se estiver rodando dentro do Synsuite:
    * Caso o PHP envie as credenciais de autenticação
    * Salvamos o host, validamos as credenciais
    * E finalizamos o processo de autenticação
    * */
    if (process.env.NODE_ENV !== 'development') {
      const authPHP = params.auth

      if (!isEmpty(authPHP)) {
        const oauth = {
          accessToken: authPHP.access_token,
          refreshToken: authPHP.refresh_token,
          expiresIn: authPHP.expires_in,
          systemPath: authPHP.system_path
        }

        await saveHost(oauth.systemPath)
        await saveTokens(oauth)
        if (hasExpired()) {
          await refreshToken()
        }
        finishLoad()
      }
    }
  }

  render() {
    const {
      classes,
      container: Container,
      containerKey,
      params,
      node,
      guest,
      auth: {
        done,
        isAuthenticated,
        hasExpired
      }
    } = this.props

    let content = null

    /*
    * caso a tela seja protegida por autenticação
    * verificamos se o usuário está logado com um token válido
    * e só assim renderizamos o componente
    * */
    if (!guest && (!done || !isAuthenticated || hasExpired())) {
      content = (
        <CardHeightFull cardContainerClass={ classes.cardHeightFull }>
          <CircularLoader visible />
        </CardHeightFull>
      )
    } else {
      content = (
        <Suspense fallback={ <div /> }>
          <Container containerKey={ containerKey } params={ params } />
        </Suspense>
      )
    }

    if (node) {
      return ReactDOM.createPortal(content, node)
    }
    return null
  }
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.any.isRequired,
  containerKey: PropTypes.string.isRequired,
  node: PropTypes.instanceOf(Element).isRequired,
  params: PropTypes.object,
  guest: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  auth: MobxPropTypes.objectOrObservableObject
}

Block.defaultProps = {
  params: {},
  guest: false
}

export default flow(
  withStores({ auth }),
  withStyles(styles)
)(Block)
