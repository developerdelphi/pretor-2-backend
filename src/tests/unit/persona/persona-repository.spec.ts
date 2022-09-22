import { PersonaRepository } from '@/domain/repository/persona-repository'
import { InputPersonaData } from '@/domain/protocols'

const makeSut = (): PersonaRepository => {
  class PersonaRepositoryPgGresStub implements PersonaRepository {
    async create (data: InputPersonaData): Promise<void> {

    }
  }

  return new PersonaRepositoryPgGresStub()
}

describe('Persona RepositoryPgGres', () => {
  test('Deve garantir que o Repositório recebeu as atributos obrigatórios da classe', async () => {
    const sut = makeSut()
    const createSpy = jest.spyOn(sut, 'create')
    const insertPersona: InputPersonaData = {
      name: 'any_name',
      kind: 'F'
    }

    await sut.create(insertPersona)
    expect(createSpy).toHaveBeenCalledWith({ name: 'any_name', kind: 'F' })
  })
})
