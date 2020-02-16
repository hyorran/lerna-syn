import React from 'react'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import moment from 'moment/moment'
import { action, observable, computed } from 'mobx'
import Button from '@syntesis/c-buttons/src/components/Button'
import Badge from '@syntesis/c-badges'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import { openHistoryItemModal } from '@syntesis/c-modals'
import { getLawsuitExpedientNotes, putLawsuitExpedientNotes } from '@syntesis/s-lawsuit-expedient-notes'

class DatagridExpedientNotesLogsStore extends DatagridClientSideStore {
  constructor() {
    super({
      endpoint: 'Lawsuit/LawsuitExpedientNotes/Logs',
      // params: {
      //   PageSize: 15
      // },
      columns: [
        {
          Header: 'Data/Hora',
          accessor: 'dateLog',
          Cell: ({ value }) => moment(value).format('L LTS'),
          width: 85,
          style: {
            justifyContent: 'flex-end',
            textAlign: 'right',
            alignItem: 'center',
            whiteSpace: 'pre-wrap'
          }
        },
        {
          Header: 'Operação',
          id: 'operation',
          sortable: false,
          minWidth: 120,
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
                      name: () => `${ this.getItem.rawEvent }`,
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
      const { response } = await getLawsuitExpedientNotes({ id })
      await putLawsuitExpedientNotes({ ...response, ...values })
      if (isFunction(cb.success)) {
        cb.success()
        this.onRefresh()
      }
    } catch (e) {
      if (isFunction(cb.failed)) {
        cb.failed(e)
        this.fallback()
      }
      throw e
    }
  }

  @observable
  item = {}

  @action
  setItem = (item) => {
    this.item = item
  }

  @computed
  get getItem() {
    return this.item
  }
}

const store = new DatagridExpedientNotesLogsStore()
export default store
