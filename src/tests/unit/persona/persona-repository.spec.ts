import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Persona } from '@/domain/entity/persona'
import { Either, left, right } from '@/shared/either'
import { InvalidNamePersonaError } from '@/domain/error'

const makeSut = (): PersonaRepository => {
  class PersonaRepositoryPgGresStub implements PersonaRepository {
    async create (data: Persona): Promise<Either<InvalidNamePersonaError, Persona>> {
      const personaOrError: Either<InvalidNamePersonaError, Persona> = Persona.create({ name: 'valid_name', kind: 'valid_kind' })
      if (personaOrError.isLeft()) {
        return await Promise.resolve(left(new InvalidNamePersonaError('invalid_name')))
      }
      return await Promise.resolve(right(personaOrError.value))
    }
  }

  return new PersonaRepositoryPgGresStub()
}

describe('Persona RepositoryPGres', () => {
  test.skip('Deve garantir que o Repositório recebeu as atributos obrigatórios da classe', async () => {
    const sut = makeSut()
    const createSpy = jest.spyOn(sut, 'create')
    const persona = Persona.create({ name: 'any_name', kind: 'F' })

    // await sut.create(persona)
    expect(createSpy).toHaveBeenCalledWith(persona)
  })
})
