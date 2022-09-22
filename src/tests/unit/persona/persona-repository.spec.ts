import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Persona } from '@/domain/entity/persona'

const makeSut = (): PersonaRepository => {
  class PersonaRepositoryPgGresStub implements PersonaRepository {
    async create (data: Persona): Promise<void> {

    }
  }

  return new PersonaRepositoryPgGresStub()
}

describe('Persona RepositoryPGres', () => {
  test('Deve garantir que o Repositório recebeu as atributos obrigatórios da classe', async () => {
    const sut = makeSut()
    const createSpy = jest.spyOn(sut, 'create')
    const persona = new Persona('', 'any_name', 'F')

    await sut.create(persona)
    expect(createSpy).toHaveBeenCalledWith(persona)
  })
})
