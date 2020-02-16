import slice from 'lodash/slice'

const paginateArray = (array, pageSize = 5, page = 1, withOlders = true) => {
  // because pages logically start with 1, but technically with 0
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const lastPage = Math.ceil(array.length / pageSize)
  return {
    items: slice(array, withOlders ? 0 : start, end),
    lastPage
  }
}

export default paginateArray
