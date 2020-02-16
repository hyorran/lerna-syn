import searchBrazilStates from '@syntesis/c-functions/src/searchBrazilStates'

test('searchBrazilStates', () => {
  expect(searchBrazilStates('RS')).toEqual('Rio Grande do Sul')
})
