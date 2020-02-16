import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import get from 'lodash/get'
import size from 'lodash/size'
import debounce from 'lodash/debounce'
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import findIndex from 'lodash/fp/findIndex'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@syntesis/c-buttons/src/components/Button'
import DeleteIconButton from '@syntesis/c-buttons/src/components/IconButton/DeleteIconButton'
import uuid from 'uuid/v1'

import styles from './styles'

class Repeater extends Component {
  constructor(props) {
    super(props)
    this.addChild = this.addChild.bind(this)
    this.removeChild = this.removeChild.bind(this)
    this.createChildComponent = this.createChildComponent.bind(this)
    this.createInitialChilds = this.createInitialChilds.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.countChilds = debounce(this.countChilds.bind(this), 200)

    this.state = {
      childs: []
    }
  }

  componentDidMount() {
    this.createInitialChilds()
  }

  componentWillUpdate() {
    this.countChilds()
  }

  countChilds() {
    const childs = filter(c => c)(this.state.childs)

    if (size(childs) !== this.props.numberOfItems) {
      this.createInitialChilds()
    }
  }

  async addChild() {
    const {
      handlerChildsChange,
      onAddItem
    } = this.props

    const { childs } = this.state
    const newIndex = filter(c => c)(childs).length
    const canAdd = await onAddItem(newIndex)
    if (canAdd) {
      await this.createChildComponent()
      handlerChildsChange()
    }
  }

  async removeChild(itemRepeaterIndex, key) {
    const {
      handlerChildsChange,
      onRemoveItem
    } = this.props

    const canRemove = await onRemoveItem(itemRepeaterIndex)
    if (canRemove) {
      this.setState(prevState => ({
        ...prevState,
        childs: map(prevState.childs, (child) => {
          const repeaterKey = get(child, 'key')
          if (repeaterKey === key) {
            return null
          }
          return child
        })
      }), handlerChildsChange)
    }
  }

  createInitialChilds() {
    const { numberOfItems } = this.props
    const childs = filter(c => c)(this.state.childs)

    if (numberOfItems) {
      // eslint-disable-next-line no-plusplus
      for (let i = size(childs); i < numberOfItems; i++) {
        this.createChildComponent()
      }
    }
  }

  createChildComponent() {
    return new Promise((resolve) => {
      const { component: ChildComponent } = this.props
      const { childs } = this.state
      const key = uuid()

      childs.push(<ChildComponent key={ key } />)

      this.setState(prevState => ({
        ...prevState,
        childs
      }), resolve)
    })
  }

  renderChild(child) {
    const {
      classes,
      stepLabel,
      canRemoveItem,
      itemName,
      disabled,
      componentProps
    } = this.props

    if (!child) {
      return null
    }

    const { childs } = this.state
    const key = get(child, 'key')

    const repeaterIndex = flow(
      filter(c => c),
      findIndex({ key })
    )(childs)

    child = {
      ...child,
      props: {
        ...child.props,
        ...componentProps,
        repeaterIndex
      }
    }

    const stepLabelProps = {}
    if (canRemoveItem) {
      stepLabelProps.icon = (
        <DeleteIconButton
          debounceReverse
          disabled={ disabled }
          size="mini"
          marginVertical={ false }
          marginHorizontal={ false }
          btnClass={ classes.stepIcon }
          onClick={ () => this.removeChild(repeaterIndex, key) }
          tooltip={ `Remover ${ itemName }` }
        />
      )
    } else {
      stepLabelProps.StepIconProps = {
        classes: { text: classes.disabledRemoveText }
      }
    }

    return (
      <Stepper
        key={ child.key }
        activeStep={ 0 }
        nonLinear
        orientation="vertical"
        classes={ { root: classes.childContainer } }
      >
        <Step>
          <StepLabel { ...stepLabelProps }>
            { isFunction(stepLabel) ? stepLabel(repeaterIndex) : stepLabel }
          </StepLabel>
          <StepContent classes={ { last: classes.stepContent } }>
            { child }
          </StepContent>
        </Step>
      </Stepper>
    )
  }

  render() {
    const {
      classes,
      label,
      canAddItem,
      itemName,
      disabled,
      error
    } = this.props

    const { childs } = this.state
    const renderedChilds = map(childs, this.renderChild)

    return (
      <div className={ classes.container }>
        {
          label
            ? (
              <Typography color={ error ? 'secondary' : 'primary' }>
                { label }
              </Typography>
            )
            : null
        }
        {
          !isEmpty(renderedChilds)
            ? (
              <div className={ classes.allSteppersContainer }>
                { renderedChilds }
              </div>
            )
            : null
        }
        {
          canAddItem
            ? (
              <Button
                debounceReverse
                disabled={ disabled }
                onClick={ this.addChild }
                btnClass={
                  [
                    classes.btnAdd,
                    isEmpty(renderedChilds) ? classes.btnAddMargin : null
                  ].join(' ')
                }
              >
                Adicionar { itemName }
              </Button>
            )
            : null
        }
      </div>
    )
  }
}

Repeater.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  component: PropTypes.func,
  componentProps: PropTypes.object,
  numberOfItems: PropTypes.number,
  handlerChildsChange: PropTypes.func,
  onAddItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  canAddItem: PropTypes.bool,
  error: PropTypes.bool,
  canRemoveItem: PropTypes.bool,
  itemName: PropTypes.string,
  disabled: PropTypes.bool,
  stepLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
}

Repeater.defaultProps = {
  label: null,
  component: () => null,
  componentProps: {},
  numberOfItems: 0,
  handlerChildsChange: () => true,
  onAddItem: () => true,
  onRemoveItem: () => true,
  disabled: false,
  error: false,
  canAddItem: true,
  canRemoveItem: true,
  itemName: 'item',
  stepLabel: null
}

export default withStyles(styles)(Repeater)
