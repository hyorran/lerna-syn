import React, { Component } from 'react'
import each from 'lodash/each'
import flow from 'lodash/flow'
import isFunction from 'lodash/isFunction'
import { withJssThemeProvider } from '@syntesis/c-styles'
import withSnackbars from '@syntesis/c-snackbars/src/actions/withSnackbars'
import { auth } from '@syntesis/s-csharp-microservices'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import Block from './Block'
import registeredBlocks from './registeredBlocks'
import mockedBlocks from './registeredBlocks/mocked'

@inject('auth')
@observer
class RootRouter extends Component {

  constructor(props) {
    super(props)
    this.onRenderComponent = this.onRenderComponent.bind(this)
    this.onDestroyComponent = this.onDestroyComponent.bind(this)
    this.onAuth = this.onAuth.bind(this)

    if (process.env.NODE_ENV === 'development') {
      /*
      * mocked to run yarn start from enigma
      * change this to development specific container
      * react will render only the container in index.html
      * */
      this.state = mockedBlocks()

      window.PubSub = {
        publish: () => {},
        subscribe: () => {}
      }
    } else {
      /*
      * register the registeredBlocks to render with PubSub publish
      * */

      this.state = registeredBlocks()
    }
  }

  componentDidMount() {
    window.PubSub.subscribe('app/block/render', this.onRenderComponent)
    window.PubSub.subscribe('app/block/destroy', this.onDestroyComponent)
    this.onAuth()
  }

  async onAuth() {
    this.props.auth.mockLogin() // if it is in development
  }

  onRenderComponent(name, {
    key,
    params = {},
    nodeId = 'react-portal'
  }) {
    const block = this.state.blocks[key]

    if (block) {
      this.setState(prevState => ({
        ...prevState,
        blocks: {
          ...prevState.blocks,
          [key]: {
            ...prevState.blocks[key],
            active: true,
            node: document.getElementById(nodeId),
            params
          }
        }
      }))
      // }), () => console.warn('blocks', this.state))
    }
  }

  onDestroyComponent(name, { key, afterDestroy }) {
    const block = this.state.blocks[key]

    if (block) {
      this.setState(prevState => ({
        ...prevState,
        blocks: {
          ...prevState.blocks,
          [key]: {
            ...prevState.blocks[key],
            params: {},
            node: null,
            active: false
          }
        }
      }))
    }

    if (isFunction(afterDestroy)) {
      afterDestroy(key)
    }
  }

  renderActiveBlocks() {
    const { blocks } = this.state

    const mappedBlocks = []

    each(blocks, (block, key) => {
      const {
        active,
        container,
        node,
        params,
        guest
      } = block

      if (active) {
        mappedBlocks.push((
          <Block
            container={ container }
            containerKey={ key }
            key={ key }
            params={ params }
            node={ node }
            guest={ guest }
          />
        ))
      }
    })
    return mappedBlocks
  }

  render() {
    return this.renderActiveBlocks()
  }
}

RootRouter.propTypes = {
  // eslint-disable-next-line react/require-default-props
  auth: MobxPropTypes.objectOrObservableObject
}

export default flow(
  withSnackbars(),
  withJssThemeProvider(),
  withStores({ auth })
)(RootRouter)
