import stringifyValue from '@syntesis/c-functions/src/stringifyValue'

test('stringifyValue', () => {
  expect(stringifyValue(false)).toEqual('Não')
})

