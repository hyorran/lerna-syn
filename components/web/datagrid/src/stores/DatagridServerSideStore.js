import { action } from 'mobx'
import isFunction from 'lodash/isFunction'
import { getServerSideData } from '@syntesis/s-datagrid'
import DatagridStore from './DatagridStore'

class DatagridServerSideStore extends DatagridStore {
  constructor(initialState = {}) {
    super({
      ...initialState
    })

    this.service = getServerSideData

    if (initialState.initialFetch === false) {
      this.datagrid.initialFetch = false
    }
  }

  @action
  initHydratedDatagrid = ({ datagrid, hydratedStore }) => {
    const { columns } = this.compareHydrate({ datagrid, hydratedStore })
    this.datagrid.columns = columns
    this.getDatagridData()
  }

  @action
  adjustSearchFilter = (filters) => {
    if (isFunction(this.transformSearchFilter)) {
      return this.transformSearchFilter(filters)
    }
    return filters
  }
}

export default DatagridServerSideStore
