import React from 'react'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import forEach from 'lodash/forEach'
import omitBy from 'lodash/omitBy'
import moment from 'moment/moment'
import { action, observable, computed } from 'mobx'
import Button from '@syntesis/c-buttons/src/components/Button'
import Badge from '@syntesis/c-badges'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import { openHistoryItemModal } from '@syntesis/c-modals'
import { getLawsuitStages, putLawsuitStages, getLawsuitStagesConfigurationControls } from '@syntesis/s-lawsuit-stages'

class DatagridLawsuitStagesLogsStore extends DatagridClientSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/LawsuitStages/Logs',
      // params: {
      //   PageSize: 15
      // },
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
                        configuration: getLawsuitStagesConfigurationControls
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
      let { response } = await getLawsuitStages({ id })

      let {
        configuration
      } = response

      configuration = JSON.parse(configuration)
      configuration = flow(map.convert({ cap: false })((value, key) => ({
        key,
        value
      })))(configuration)

      // mapeia alteração no campo json para poder enviar o objeto com a alteração pontual
      forEach(values, (value, name) => {
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

          values = omitBy(values, (_, key) => key === name)
        }
      })

      response = {
        ...response,
        configuration
      }

      await putLawsuitStages({ ...response, ...values })
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
