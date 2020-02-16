import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import truncate from 'lodash/truncate'
import toString from 'lodash/toString'
import find from 'lodash/find'
import get from 'lodash/get'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import { getR2010Parameters, getServiceClassifications } from '@syntesis/s-reinf'
import DatagridClientSide from '@syntesis/c-datagrid/src/containers/ClientSideContainer'
import CpfCnpjInput from '@syntesis/c-inputs/src/components/CpfCnpjInput'
import trimCpfCnpj from '@syntesis/c-functions/src/trimCpfCnpj'
import datagridReinfR2010Store from '../../stores/datagridReinfR2010Store'
import SubComponent from './SubComponent'

import styles from './styles'

@inject('datagridReinfR2010Store')
@observer
class DatagridR2010Container extends Component {
  constructor(props) {
    super(props)
    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.getItems = this.getItems.bind(this)
    this.getServiceClassificationsOptions = this.getServiceClassificationsOptions.bind(this)

    this.couldRequest = true

    this.state = {
      competenceValue: null,
      serviceClassifications: [],
      serviceClassificationsLoading: true
    }
  }

  componentDidMount() {
    this.getItems()
    this.getServiceClassificationsOptions()
  }

  componentDidUpdate() {
    this.getItems()
  }

  async getServiceClassificationsOptions() {
    const { response } = await getServiceClassifications()

    const serviceClassifications = map(response, item => ({
      label: `${ item.code } - ${ truncate(item.description, { length: 65 }) }`,
      value: toString(item.id)
    }))

    this.setState(prevState => ({
      ...prevState,
      serviceClassifications,
      serviceClassificationsLoading: false
    }))
  }

  async getItems() {
    const {
      item: { id },
      competence,
      onStepperLoaded,
      onStepperRemoved,
      stepperIndex
    } = this.props

    const { competenceValue } = this.state

    if (this.couldRequest && competence.isValid && competenceValue !== competence.value) {
      this.couldRequest = false
      onStepperRemoved(stepperIndex)

      const { response = {} } = await getR2010Parameters({
        companyPlaceId: id,
        competence: competence.value,
      })

      this.refreshDatagrid(response)

      this.setState(prevState => ({
        ...prevState,
        competenceValue: competence.value
      }), () => {
        onStepperLoaded(stepperIndex)
        this.couldRequest = true
      })
    }
  }

  refreshDatagrid(data) {
    const {
      datagridReinfR2010Store: {
        setData
      }
    } = this.props

    setData(data)
  }

  render() {
    const {
      classes,
      adjustHeight,
      datagridReinfR2010Store: store,
      isActiveStepper
    } = this.props

    const { serviceClassifications } = this.state

    const { getDatagrid } = store

    let adjusts = {}
    if (isEmpty(getDatagrid.data)) {
      adjusts = {
        ...adjusts,
        minRows: 3
      }
    }

    return (
      <div className={ classes.container }>
        <DatagridClientSide
          store={ store }
          { ...getDatagrid }
          { ...adjusts }
          loading={ false }
          searchLabel="Nº de inscrição / CNPJ do prestador"
          searchAutoFocus={ isActiveStepper }
          searchInputComponent={ props => (
            <CpfCnpjInput
              inputProps={ {
                inputProps: {
                  onlyCnpj: true,
                  guide: true
                }
              } }
              { ...props }
              onChange={ (_, { value }) => props.onChange(_, { value: trimCpfCnpj(value) }) }
            />
          ) }
          SubComponent={ props => (
            <SubComponent
              { ...props }
              adjustHeight={ adjustHeight }
              serviceClassifications={ serviceClassifications }
            />
          ) }
        />
      </div>
    )
  }
}

DatagridR2010Container.propTypes = {
  classes: PropTypes.object.isRequired,
  competence: PropTypes.object.isRequired,
  stepperIndex: PropTypes.number.isRequired,
  onStepperLoaded: PropTypes.func.isRequired,
  onStepperRemoved: PropTypes.func.isRequired,
  item: PropTypes.object,
  initialData: PropTypes.arrayOf(PropTypes.object),
  adjustHeight: PropTypes.func,
  isActiveStepper: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  datagridReinfR2010Store: MobxPropTypes.objectOrObservableObject
}

DatagridR2010Container.defaultProps = {
  item: [],
  initialData: [],
  adjustHeight: () => {},
  isActiveStepper: false
}

export default flow(
  withStyles(styles),
  withStores({
    datagridReinfR2010Store
  })
)(DatagridR2010Container)
