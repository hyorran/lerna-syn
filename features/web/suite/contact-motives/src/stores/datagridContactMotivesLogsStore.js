import React from 'react'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import moment from 'moment/moment'
import { action, observable, computed } from 'mobx'
import Button from '@syntesis/c-buttons/src/components/Button'
import Badge from '@syntesis/c-badges'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import { openHistoryItemModal } from '@syntesis/c-modals'
import { getCrmMotives, putCrmMotives } from '@syntesis/s-crm-motives'

class DatagridContactMotivesLogsStore extends DatagridClientSideStore {
  constructor() {
    super({
      endpoint: 'CRM/CrmMotives/Logs',
      columns: [
        {
          Header: 'Data/Hora',
          accessor: 'dateLog',
          Cell: ({ value }) => moment(value).format('L LT'),
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
                      onConfirm: this.updateItem
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
      const { response } = await getCrmMotives({ id })
      await putCrmMotives({ ...response, ...values })
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

const store = new DatagridContactMotivesLogsStore()
export default store
