import { AddPersonaController } from '@/presentation/controllers/persona/add-persona'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { NameValidator } from '@/presentation/protocols/name-validator'

interface SutTypes {
  sut: AddPersonaController
  nameValidatorStub: NameValidator
}

const makeSut = (): SutTypes => {
  class NameValidatorStub implements NameValidator {
    isValid (name: string): boolean {
      if (!name) return false
      // if (name.trim().length >= 5) return true
      return true
    }
  }
  const nameValidatorStub = new NameValidatorStub()
  const sut = new AddPersonaController(nameValidatorStub)

  return { sut, nameValidatorStub }
}

describe('AddPersona Controller', () => {
  test('Deve retornar 400 se não recebeu parâmetro name', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: 'valid_cpf'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.data).toBeInstanceOf(MissingParamError)
  })

  test('Deve retornar 400 se recebeu dados inválidos para parâmetro name', () => {
    const { sut, nameValidatorStub } = makeSut()
    jest.spyOn(nameValidatorStub, 'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: ''
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.data).toBeInstanceOf(MissingParamError)
  })
})
