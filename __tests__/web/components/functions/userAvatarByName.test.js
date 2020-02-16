import userAvatarByName from '@syntesis/c-functions/src/userAvatarByName'

test('userAvatarByName', () => {
  expect(userAvatarByName('Super User')).toEqual('SU')
})
