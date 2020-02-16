import React from 'react'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import moment from 'moment/moment'
import { action, observable, computed } from 'mobx'
import Button from '@syntesis/c-buttons/src/components/Button'
import Badge from '@syntesis/c-badges'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import { openHistoryItemModal } from '@syntesis/c-modals'
import {
  getBankAccount,
  getBankAccountParameters,
  putBankAccount
} from '@syntesis/s-bank-accounts'

class DatagridLogsStore extends DatagridClientSideStore {
  constructor() {
    super({
      endpoint: 'Financial/BankAccounts/Logs',
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
                      name: () => `${ this.getItem.code } - ${ this.getItem.description }`,
                      onConfirm: this.updateItem,
                      getControls: {
                        eletronicPaymentConfig: getBankAccountParameters
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
      let { response } = await getBankAccount({ id })

      let {
        eletronicPaymentConfig
      } = response

      if (!isEmpty(eletronicPaymentConfig)) {
        eletronicPaymentConfig = JSON.parse(eletronicPaymentConfig)
        eletronicPaymentConfig = map(eletronicPaymentConfig, (value, key) => ({
          key,
          value
        }))
      }

      // mapeia alteração no campo json para poder enviar o objeto com a alteração pontual
      let newValues = { ...values }
      forEach(values, (value, name) => {

        const [control, subControl] = name.split('.')

        if (control === 'eletronicPaymentConfig' && subControl) {
          eletronicPaymentConfig = map(eletronicPaymentConfig, (item) => {
            if (item.key === subControl) {
              return {
                ...item,
                value
              }
            }
            return item
          })

          newValues = omitBy(newValues, (_, key) => key === name)
        }
      })

      response = {
        ...response,
        eletronicPaymentConfig,
        ...newValues
      }

      await putBankAccount(response)
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

const store = new DatagridLogsStore()
export default store
