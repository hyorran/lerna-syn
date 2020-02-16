import upperSnakeCase from '@syntesis/c-functions/src/upperSnackCase'

test('upperSnakeCase', () => {
  expect(upperSnakeCase('cat and dog')).toEqual('CAT_AND_DOG')
})

