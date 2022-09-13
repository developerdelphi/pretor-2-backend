import { DbAddPersona } from '@/data/usecases/add-persona/db-add-persona'

describe('DbAddPersona Usecase', () => {
  test('Deve garantir que DbAddPersona foi chamado com valores corretos', async () => {
    const sut = new DbAddPersona()
    const addPersona = {
      name: 'Valid Name'
    }

    const result = await sut.add(addPersona)
    const fakeResult = {
      id: 'valid_id',
      name: 'Valid Name'
    }
    expect(result).toEqual(fakeResult)
  })
})
