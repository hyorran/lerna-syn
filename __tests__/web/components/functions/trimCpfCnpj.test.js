import trimCpfCnpj from '@syntesis/c-functions/src/trimCpfCnpj'

test('trimCpfCnpj', () => {
  expect(trimCpfCnpj('059.893.186-42')).toEqual('05989318642')
  expect(trimCpfCnpj('57.338.801/0001-89')).toEqual('57338801000189')
})

