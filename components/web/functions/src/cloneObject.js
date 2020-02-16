const cloneObject = (obj = {}) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {
    throw e
  }
}

export default cloneObject
