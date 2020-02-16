import sortDateRange from '@syntesis/c-functions/src/sortDateRange'

test('sortDateRange', () => {
  expect(sortDateRange('01/01/2019', '01/02/2018')).toEqual(['2018-01-02', '2019-01-01'])
})

