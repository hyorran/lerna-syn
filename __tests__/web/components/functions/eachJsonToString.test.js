import eachJsonToString from '@syntesis/c-functions/src/eachJsonToString'

const json = {
  'menu': {
    'id': 'file',
    'value': 'File',
    'popup': {
      'menuitem': [
        { 'value': 'New', 'onclick': 'CreateNewDoc()' },
        { 'value': 'Open', 'onclick': 'OpenDoc()' },
        { 'value': 'Close', 'onclick': 'CloseDoc()' }
      ]
    }
  }
}

test('eachJsonToString', () => {
  expect(eachJsonToString(json)).toBeDefined()
})
