import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/fp/flow'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Form from '@syntesis/c-inputs/src/components/Form'
import RadioButtonGroup from '@syntesis/c-inputs/src/components/RadioButtonsGroup'
import RadioButton from '@syntesis/c-inputs/src/components/RadioButton'
import SaveIconButton from '@syntesis/c-buttons/src/components/IconButton/SaveIconButton'
import { withStores } from '@syntesis/c-stores-provider'
import expedientNotesLinkProcessStore from '../../stores/formExpedientNotesLinkProcessStore'
import DetailsContainer from '../DetailsContainer'
import FormExistingProcessContainer from './FormExistingProcessContainer'
import FormNewProcessContainer from './FormNewProcessContainer'

import styles from './styles'

@inject('expedientNotesLinkProcessStore')
@observer
class FormLinkProcessContainer extends Component {
  constructor(props) {
    super(props)

    this.changeCondition = this.changeCondition.bind(this)

    const create = props.createMode || isEmpty(props.item)

    this.state = {
      mode: {
        create,
        update: !create && props.item.id
      },
      optionType: '1',
      options: [
        { value: '1', label: 'Processo existente', checked: true },
        { value: '2', label: 'Novo processo', checked: false }
      ]
    }
  }

  changeCondition(newValue) {
    const {
      expedientNotesLinkProcessStore: {
        changeAllControlsRules,
        resetFormControls
      }
    } = this.props

    resetFormControls()

    changeAllControlsRules([
      { controlName: 'lawsuitId', newRules: ['required'], add: newValue === '1' },
      { controlName: 'lawsuitTypeId', newRules: ['required'], add: newValue === '2' }
    ])

    this.setState(prevState => ({
      ...prevState,
      optionType: newValue
    }))

    // if (newValue === '1') {
    //   // this.getOptionsExistentLawsuit()
    // } else {
    //   // this.getOptionsNewLawsuit()
    // }
  }

  render() {
    const {
      classes,
      item,
      onSuccess,
      dialogId,
      expedientNotesLinkProcessStore: store,
      footerContainerClass,
      withButtons
    } = this.props

    const {
      getFormControls,
      getFormStatus,
      changed
    } = store

    const {
      linkType,
    } = getFormControls

    const { mode } = this.state
    const disabled = getFormStatus.loading

    return (
      <div className={ classes.root }>
        <Grid container>
          <Grid item md={ 7 } xs={ 12 }>
            <DetailsContainer
              item={ item }
            />
          </Grid>
          <Grid item md={ 5 } xs={ 12 }>
            <Form
              mode={ mode }
              store={ store }
              onSuccess={ () => onSuccess(dialogId) }
              controls={ { ...getFormControls } }
              item={ item }
            >
              <RadioButtonGroup
                inline
                className={ classes.radioGroup }
                name="linkType"
                color="primary"
                onChange={ this.changeCondition }
                initialValue={ linkType.value }
              >
                {
                    map(this.state.options, option => (
                      <RadioButton
                        key={ option.value }
                        fontSize={ 20 }
                        fontSizeLabel={ 15 }
                        { ...option }
                      />
                    ))
                  }
              </RadioButtonGroup>
              {
                this.state.optionType === '1'
                  ? <FormExistingProcessContainer />
                  : <FormNewProcessContainer />
              }
              {
                withButtons
                  ? (
                    <div className={ [classes.footerContainer, footerContainerClass].join(' ') }>
                      <SaveIconButton
                        type="submit"
                        asCreate
                        disabled={ disabled || !changed }
                      >
                        Salvar
                      </SaveIconButton>
                    </div>
                  )
                  : null
              }
            </Form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

FormLinkProcessContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  footerContainerClass: PropTypes.string,
  onSuccess: PropTypes.func,
  dialogId: PropTypes.string,
  item: PropTypes.object,
  createMode: PropTypes.bool,
  withButtons: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  expedientNotesLinkProcessStore: MobxPropTypes.objectOrObservableObject
}

FormLinkProcessContainer.defaultProps = {
  footerContainerClass: null,
  onSuccess: () => {},
  dialogId: undefined,
  createMode: false,
  withButtons: false,
  item: {}
}

export default flow(
  withStyles(styles),
  withStores({ expedientNotesLinkProcessStore })
)(FormLinkProcessContainer)
