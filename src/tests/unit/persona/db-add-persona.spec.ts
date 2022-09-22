import { DbAddPersona } from '@/data/usecases/add-persona/db-add-persona'
import { InputPersonaData } from '@/domain/protocols'

const makeSut = (): DbAddPersona => {
  const sut = new DbAddPersona()
  return sut
}

describe('DbAddPersona Usecase', () => {
  test('Deve garantir que DbAddPersona foi chamado com valores corretos', async () => {
    const sut = makeSut()
    const addPersona: InputPersonaData = {
      name: 'Valid Name',
      kind: 'valid_kind'
    }

    const result = await sut.add(addPersona)
    const fakeResult = {
      persona_id: 'valid_id',
      name: 'Valid Name',
      kind: 'valid_kind'
    }
    expect(result).toEqual(fakeResult)
  })

  test('Deve garantir que AddPersonaRepository foi chamado com valores corretos', async () => {
    const sut = makeSut()
    const addPersona = {
      name: 'Valid Name',
      kind: 'valid_kind'
    }

    const result = await sut.add(addPersona)
    const fakeResult = {
      persona_id: 'valid_id',
      name: 'Valid Name',
      kind: 'valid_kind'
    }
    expect(result).toEqual(fakeResult)
  })
})
