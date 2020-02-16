import trim from 'lodash/trim'

/**
 * htmlToText
 * Convert a html to friendly string
 * e.g. <p>test</p> => 'test'
 *
 * */
const htmlToText = (html) => {
  const temp = document.createElement('div')
  temp.innerHTML = html
  const response = temp.textContent || temp.innerText || ''
  return trim(response)
}

export default htmlToText
