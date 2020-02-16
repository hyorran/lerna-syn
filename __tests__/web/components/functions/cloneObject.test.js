import cloneObject from '@syntesis/c-functions/src/cloneObject'

const object = {
  index: 0,
  value: 1
}

test('cloneObject', () => {
  expect(cloneObject(object)).toEqual(object)
})

