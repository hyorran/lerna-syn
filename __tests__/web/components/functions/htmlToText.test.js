import htmlToText from '@syntesis/c-functions/src/htmlToText'

test('htmlToText', () => {
  expect(htmlToText('<p>test</p>')).toEqual('test')
})
