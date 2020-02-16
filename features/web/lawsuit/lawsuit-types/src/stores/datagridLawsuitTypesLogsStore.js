import React from 'react'
import parseInt from 'lodash/parseInt'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import forEach from 'lodash/forEach'
import flow from 'lodash/fp/flow'
import getFP from 'lodash/fp/get'
import map from 'lodash/fp/map'
import moment from 'moment/moment'
import { action, observable, computed } from 'mobx'
import Button from '@syntesis/c-buttons/src/components/Button'
import Badge from '@syntesis/c-badges'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import { openHistoryItemModal } from '@syntesis/c-modals'
import {
  getLawsuitTypes,
  getLawsuitTypesConfigurationControls,
  putLawsuitTypes
} from '@syntesis/s-lawsuit-types'
import isEmpty from 'lodash/isEmpty'

class DatagridLawsuitStagesLogsStore extends DatagridClientSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/LawsuitTypes/Logs',
      columns: [
        {
          Header: 'Data/Hora',
          accessor: 'dateLog',
          Cell: ({ value }) => moment(value).format('L LTS'),
          autoWidth: true,
          style: {
            justifyContent: 'center'
          }
        },
        {
          Header: 'Operação',
          id: 'operation',
          sortable: false,
          style: {
            justifyContent: 'center'
          },
          // eslint-disable-next-line react/prop-types
          accessor: (row) => {
            const { operation } = row

            let operationStr
            switch (operation) {
              case 1:
                operationStr = 'Criado'
                break
              case 2:
                operationStr = 'Editado'
                break
              case 3:
                operationStr = 'Deletado'
                break
              default:
                operationStr = ''
                break
            }
            return `Registro ${ operationStr }`
          },
          // eslint-disable-next-line react/prop-types,jsx-a11y/anchor-is-valid
          Cell: ({ value, original }) => {
            const isEdited = original.operation === 2
            const isAdded = original.operation === 1
            const btnProps = {}

            if (isEdited) {
              btnProps.color = 'primary'
            }

            return (
              <Badge
                invisible={ !isEdited }
                content={ original.items.length }
              >
                <Button
                  btnProps={ btnProps }
                  asCreate={ isAdded }
                  wrap
                  capitalize
                  roleStyle="noMargin"
                  variant={ !isEdited ? 'text' : undefined }
                  disabled={ !isEdited }
                  onClick={
                    () => openHistoryItemModal({
                      item: original,
                      operation: value,
                      name: () => `${ this.getItem.code } - ${ this.getItem.title }`,
                      onConfirm: this.updateItem,
                      getControls: {
                        configuration: getLawsuitTypesConfigurationControls
                      }
                    })
                  }
                >
                  { value }
                </Button>
              </Badge>
            )
          }
        },
        {
          Header: 'Responsável',
          id: 'user',
          accessor: row => get(row, 'personName'),
          sortable: false,
          style: {
            whiteSpace: 'pre-wrap'
          }
        }
      ]
    })

    this.updateItem = this.updateItem.bind(this)
  }

  @action
  async updateItem(values, cb = {}) {
    try {
      const { id } = this.item
      let { response } = await getLawsuitTypes({ id })

      let {
        configuration
      } = response

      configuration = JSON.parse(configuration)
      configuration = map.convert({ cap: false })((value, key) => ({
        key,
        value
      }))(configuration)

      // mapeia alteração no campo json para poder enviar o objeto com a alteração pontual
      let newValues = { ...values }
      forEach(values, (value, name) => {

        // verifica se stages (array) é um campo que deve ser restaurado
        // e transforma em array com valores, ou array vazio
        if (name === 'stages') {
          if (!isEmpty(value)) {
            try {
              const stages = JSON.parse(value)
              newValues = {
                ...newValues,
                stages
              }
            } catch (e) {
              //
            }
          } else {
            newValues = {
              ...newValues,
              stages: []
            }
          }
        }

        const [control, subControl] = name.split('.')

        if (control === 'configuration' && subControl) {
          configuration = map((item) => {
            if (item.key === subControl) {
              return {
                ...item,
                value
              }
            }
            return item
          })(configuration)

          newValues = omitBy(newValues, (_, key) => key === name)
        }
      })

      const stages = flow(
        getFP('lawsuitTypesStages'),
        map(value => parseInt(value.value))
      )(response)
      response = omitBy(response, (_, key) => key === 'lawsuitTypesStages')

      response = {
        ...response,
        configuration,
        stages,
        ...newValues
      }

      await putLawsuitTypes(response)
      if (isFunction(cb.success)) {
        cb.success()
        this.onRefresh()
      }
    } catch (e) {
      if (isFunction(cb.failed)) {
        cb.failed()
      }
      throw e
    }
  }

  @action registerOnRefresh = (onRefresh) => {
    this.onRefresh = onRefresh
  }

  @observable
  item = {}

  @action
  onRefresh = () => {}

  @action
  setItem = (item) => {
    this.item = item
  }

  @computed
  get getItem() {
    return this.item
  }
}

const store = new DatagridLawsuitStagesLogsStore()
export default store
