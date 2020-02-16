# @syntesis/c-datagrid

> A package to create datagrid client-side/server-side.
> It is a component based from [React Table](https://react-table.js.org/).

## Install
Add `@syntesis/c-datagrid` into package.json dependencies from another package.



## Store
Create a store inside your package, that extends `DatagridClientSideStore` or `DatagridServerSideStore`.
#### Usage
##### DatagridClientSideStore
```js

```

##### DatagridServerSideStore
```js
import { DatagridServerSideStore } from '@syntesis/c-datagrid'

class DatagridStore extends DatagridServerSideStore {
  constructor() {
    super({
      endpoint: 'Financial/PaymentForms',
      params: {
        OrderBy: [
          {
            PropertyName: 'code',
            Dir: 'a'
          }
        ]
      },
      columns: [
        {
          Header: 'Código',
          accessor: 'code',
          searchOperation: 'contains',
          width: 100,
          searchable: true,
          style: {
            justifyContent: 'flex-end'
          }
        },
        {
          Header: 'Título',
          accessor: 'title',
          searchOperation: 'contains',
          autoWidth: true,
          searchable: true
        },
        {
          Header: 'Descrição',
          accessor: 'description',
          searchable: false,
          sortable: false
        }
      ]
    })
  }
  
  // transform advanced filter form data to apply on API
  transformDataToFilter(filtersFromForm) {
    return filtersFromForm
  }
}

const store = new DatagridStore()
export default store
```
##### Props
| name                   	| type   	| possible values                     	| required                            	| description                                                       	|
|------------------------	|--------	|-------------------------------------	|-------------------------------------	|-------------------------------------------------------------------	|
| endpoint               	| string 	| -                                   	| yes                                 	| C# API endpoint (after `/api/`) or full url with http(s) protocol 	|
| params                 	| object 	| -                                   	| no                                  	|                                                                   	|
| params.OrderBy         	| array  	| `[{ PropertyName: 'code',Dir: 'a' }]`	| no                                  	| Set default sort based on API keys                                	|
| params.Page            	| number 	| -                                   	| no                                  	| Page number that will be fetched                                  	|
| params.PageSize        	| number 	| -                                   	| no                                  	| Number or records that will be returned from API                  	|
| Columns                	| array  	| array of columns                    	| yes                                 	| config each Column                                                	|
| Column.Header          	| string 	| -                                   	| yes                                 	| Column name                                                       	|
| Column.accessor        	| string 	| API key                             	| yes                                 	| Key from API column                                               	|
| Column.searchable      	| bool   	| -                                   	| no                                  	| If `true` enable global search in column                          	|
| Column.searchOperation 	| string 	| `Contains` ...                      	| yes if is searchable                 	| Inform the API what method that should to use to search this key  	|
| Column.width           	| number 	| -                                   	| no                                  	| initial column size                                               	|
| Column.autoWidth       	| bool   	| -                                   	| no                                  	| If `true`, the datagrid calculate the column with automatically   	|
| Column.sortable        	| bool   	| default `true`                      	|  no                                 	| If `true`, disable sort by this column                            	|
| Column.style           	| object 	| -                                   	| no                                  	| Styling object to column body                                     	|

## Containers

### DatagridClientSide
#### Usage
#### Props

### DatagridServerSide
#### Usage
```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import DatagridServerSide from '@syntesis/c-datagrid/lib/containers/ServerSideContainer'
import { withStores } from '@syntesis/c-stores-provider'
import datagridStore from './stores/datagridStore'
import FormModal from './modals/FormModal'
import DeleteModal from './modals/DeleteModal'


@inject('datagridStore')
@observer
class DatagridContainer extends Component {
  constructor(props) {
    super(props)

    this.refreshDatagrid = this.refreshDatagrid.bind(this)
    this.onActiveRowClick = this.onActiveRowClick.bind(this)
    this.onInactiveRowClick = this.onInactiveRowClick.bind(this)

    this.state = {
      toolbarButtons: [
        {
          type: 'add',
          modalComponent: FormModal,
          modalProps: {
            contentComponentProps: {
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
          }
        },
        {
          type: 'export',
          filenameRef: 'Datagrid table name'
        }
      ],
      rowActions: [
        {
          type: 'update',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: FormModal,
          modalProps: {
            contentComponentProps: {
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
          }
        },
        {
          type: 'duplicate',
          condition: () => true,
          modalComponent: FormModal,
          modalProps: {
            contentComponentProps: {
              createMode: true, // force `mode.create`
              onSuccess: (dialogId) => {
                window.closeDialog(dialogId)
                this.refreshDatagrid()
              }
            }
          }
        },
        {
          type: 'delete',
          condition: ({ synsuiteCode }) => !synsuiteCode,
          modalComponent: DeleteModal,
          modalProps: {
            onSuccess: this.refreshDatagrid,
            name: ({ code, title }) => `${ code } - ${ title }`
          }
        }
      ]
    }
  }

  onActiveRowClick(row) {
    const {
      onSelectClickRow,
      datagridStore: {
        onRowClick
      }
    } = this.props

    const {
      index,
      original: {
        id
      }
    } = row

    onRowClick({ index })
    onSelectClickRow({ id })
  }

  onInactiveRowClick() {
    const {
      onUnselectClickRow,
      datagridStore: {
        onRowClick
      }
    } = this.props

    onUnselectClickRow()
    onRowClick({ index: null })
  }

  refreshDatagrid() {
    const {
      datagridStore: {
        getDatagridData
      }
    } = this.props

    getDatagridData()
  }

  render() {
    const {
      datagridStore: store
    } = this.props

    const {
      toolbarButtons,
      rowActions
    } = this.state

    const { getDatagrid } = store

    return (
      <DatagridServerSide
        multiSelect
        store={ store }
        onActiveRowClick={ this.onActiveRowClick }
        onInactiveRowClick={ this.onInactiveRowClick }
        toolbarButtons={ toolbarButtons }
        rowActions={ rowActions }
        { ...getDatagrid }
      />
    )
  }
}

DatagridContainer.propTypes = {
  onSelectClickRow: PropTypes.func,
  onUnselectClickRow: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  datagridStore: MobxPropTypes.objectOrObservableObject
}

DatagridContainer.defaultProps = {
  onSelectClickRow: () => {},
  onUnselectClickRow: () => {},
}

export default withStores({ datagridStore })(DatagridContainer)
```
#### Props
| name               	| type       	| required 	| default                            	| description                                                     	|
|--------------------	|------------	|----------	|------------------------------------	|-----------------------------------------------------------------	|
| multiSelect        	| bool       	| no       	| `false`                            	| Enable checkbox as a column and multi-action buttons on toolbar 	|
| store              	| MobX Store 	| yes      	|                                    	| Store injected in container                                     	|
| onActiveRowClick   	| func       	| no       	| `() => {}`                         	| Callback to selected row                                        	|
| onInactiveRowClick 	| func       	| no       	| `() => {}`                         	| Callback to unselected row                                      	|
| toolbarButtons     	| array      	| no       	| `[]`                               	| Array of buttons that will be rendered on toolbar               	|
| rowActions         	| array      	| no       	| `[]`                               	| Array of buttons that will be rendered on row                   	|
| noDataText         	| string     	| no       	| `'Nenhuma informação encontrada.'` 	| Without data message                                             	|

## License

MIT © [](https://github.com/)
