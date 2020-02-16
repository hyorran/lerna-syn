import { action } from 'mobx'
import DatagridStore from './DatagridStore'
import map from 'lodash/map'
import uuid from 'uuid/v1'
import get from 'lodash/get'
import remove from 'lodash/remove'
import { getClientSideData } from '@syntesis/s-datagrid'

class DatagridClientSideStore extends DatagridStore {
  constructor(initialState = {}) {
    super({
      ...initialState,
      apiKey: '_uuid'
    })

    this.service = getClientSideData

    this.editOrAddItem = this.editOrAddItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  @action
  setData = (data) => {
    this.datagrid = {
      ...this.datagrid,
      data: map(data, (item, index) => ({
        ...item,
        _uuid: get(this.datagrid, `data[${ index }]._uuid`) || uuid()
      }))
    }
  }

  @action
  async editOrAddItem(item) {
    const { _uuid: id } = item
    const { data } = this.datagrid

    if (id) {
      // edit
      this.datagrid = {
        ...this.datagrid,
        data: map(
          data,
          row => (get(row, '_uuid') === id ? item : row)
        )
      }
    } else {
      // add
      this.datagrid = {
        ...this.datagrid,
        data: [
          ...data,
          {
            ...item,
            _uuid: uuid()
          }
        ]
      }
    }

    return this.datagrid.data
  }

  @action
  async removeItem(item) {
    const { _uuid: id } = item
    const { data } = this.datagrid

    remove(data, row => get(row, '_uuid') === id)

    this.datagrid = {
      ...this.datagrid,
      data
    }

    return this.datagrid.data
  }
}

export default DatagridClientSideStore
