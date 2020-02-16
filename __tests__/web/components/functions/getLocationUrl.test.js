import getLocationUrl from '@syntesis/c-functions/src/getLocationUrl'

test('getLocationUrl', () => {
  expect(getLocationUrl()).toEqual('http://localhost')
})
