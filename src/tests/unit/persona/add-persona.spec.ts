import { AddPersonaController } from '@/presentation/controllers/persona/add-persona'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { NameValidator } from '@/presentation/protocols/name-validator'

const makeSut = (): AddPersonaController => {
  class NameValidatorStub implements NameValidator {
    isValid (name: string): boolean {
      if (!name) return false
      if (name.trim().length >= 5) return true
      return false
    }
  }
  const nameValidatorStub = new NameValidatorStub()
  return new AddPersonaController(nameValidatorStub)
}

describe('AddPersona Controller', () => {
  test('Deve retornar 400 se não informou parâmetro name', () => {
    const sut = makeSut()
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
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: ''
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // expect(httpResponse.body.data).toBeInstanceOf(MissingParamError)
  })
})
