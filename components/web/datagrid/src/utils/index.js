import matchSorter from 'match-sorter'
import last from 'lodash/last'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

const setColumnsWidth = (columns, rows) => map(columns, column => ({
  ...column,
  width: column.autoWidth
    ? getColumnWidth(rows, column.accessor, column.Header)
    : column.width
}))

const getColumnWidth = (rows, accessor, headerText) => {
  const maxWidth = 400
  const minWidthWithComponent = 200
  const magicSpacing = length => (length + 4) * 7.33

  const allWidths = rows.map((row) => {
    const data = `${ row[accessor] || '' }`
    if (!isEmpty(data)) {
      return magicSpacing(data.length)
    }
    return minWidthWithComponent
  })

  const cellLength = Math.max(
    ...allWidths,
    magicSpacing(headerText.length)
  )

  return Math.min(maxWidth, cellLength)
}

const removeLastColumnResize = (columns) => {
  const lastColumn = last(columns)
  return [
    ...map(columns, (column) => {
      if (column.accessor === lastColumn.accessor) {
        column = {
          ...column,
          resizable: false,
        }
      }
      return {
        ...column,
        filterable: !!column.filterable
      }
    })
  ]
}

const enableAllSearch = (searchableKeys) => {
  if (isEmpty(searchableKeys)) {
    return {}
  }

  return {
    // NOTE - this is a "filter all" DUMMY column
    // you can't HIDE it because then it wont FILTER
    // but it has a size of ZERO with no RESIZE and the
    // FILTER component is NULL (it adds a little to the front)
    // You could possibly move it to the end
    Header: '',
    id: 'allSearch',
    width: 0,
    maxWidth: 0,
    style: {
      display: 'none'
    },
    getHeaderProps: () => ({
      style: {
        display: 'none'
      }
    }),
    resizable: false,
    sortable: false,
    filterAll: true,
    Filter: () => {},
    filterMethod: (filter, rows) => {
      // using match-sorter
      // it will take the content entered into the "filter"
      // and search for it in EITHER the keys
      const result = matchSorter(rows, filter.value, {
        keys: searchableKeys,
        threshold: matchSorter.rankings.WORD_STARTS_WITH
      })
      return result
    }

  }
}

export {
  setColumnsWidth,
  removeLastColumnResize,
  enableAllSearch,
}
