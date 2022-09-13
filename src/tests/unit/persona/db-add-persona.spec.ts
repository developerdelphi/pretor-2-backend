import { DbAddPersona } from '@/data/usecases/add-persona/db-add-persona'

const makeSut = (): DbAddPersona => {
  const sut = new DbAddPersona()
  return sut
}

describe('DbAddPersona Usecase', () => {
  test('Deve garantir que DbAddPersona foi chamado com valores corretos', async () => {
    const sut = makeSut()
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

  test('Deve garantir que AddPersonaRepository foi chamado com valores corretos', async () => {
    const sut = makeSut()
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
