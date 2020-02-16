import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import isEmpty from 'lodash/isEmpty'

import styles from './styles'

class Form extends Component {
  constructor(props) {
    super(props)

    // seta o modo (create/update) na store para saber qual service utilizar
    props.store.changeFormMode(props.mode)
    // seta o callback de sucesso na store para executar em caso de sucesso
    props.store.setOnSuccess(props.onSuccess)
  }

  componentDidMount() {
    const {
      item,
      mode,
      store: {
        getApiControlsData
      }
    } = this.props

    if (!isEmpty(item)) {
      /*
      * caso tenha um item,
      * chama a action que popula a store com dados vindos da API
      * isso irá atualizar os controles automaticamente
      * e mudar o formulário para duplicar ou editar item
      * */
      getApiControlsData(item, mode)
    }
  }

  componentWillUnmount() {
    this.props.store.resetForm()
  }

  render() {
    const {
      classes,
      children,
      containerClass,
      store
    } = this.props

    return (
      <React.Fragment>
        <form
          noValidate // desabilita html5 API validation
          className={ [classes.container, containerClass].join(' ') }
          onSubmit={
            (e) => {
              // desativa submit automatico do browser
              // por conta da semântica do html
              e.preventDefault()
              store.submit()
            }
          }
        >
          { children }
        </form>
      </React.Fragment>
    )
  }
}

Form.propTypes = {
  /** Component's 'Store' */
  store: PropTypes.object.isRequired,
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  controls: PropTypes.object.isRequired,
  /** - */
  item: PropTypes.object,
  /** Function executed onSuccess. */
  onSuccess: PropTypes.func,
  /** - */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  /** - */
  mode: PropTypes.object.isRequired,
  /** - */
  containerClass: PropTypes.string
}

Form.defaultProps = {
  item: {},
  onSuccess: () => {},
  containerClass: null
}

export default withStyles(styles)(Form)
export { Form as ComponentWithProps }
