import { Street } from '@/domain/value-object/street'
import { InvalidParamError } from '@/presentation/errors'
import { Either, Left, Right } from '@/shared/either'

describe('Street Value Object', () => {
  test('Não deve criar se o valor informado de logradouro (street) é inválido', () => {
    const streetInput = ''
    const sut: Either<InvalidParamError, Street> = Street.create(streetInput)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut).toBeInstanceOf(Left)
    expect(sut.value).toBeInstanceOf(InvalidParamError)
  })

  test('Não deve criar se o valor informado de logradouro (street) menor ou igual 3 caracteres', () => {
    const streetInput = 'Rua'
    const sut: Either<InvalidParamError, Street> = Street.create(streetInput)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut).toBeInstanceOf(Left)
    expect(sut.value).toBeInstanceOf(InvalidParamError)
  })

  test('Deve criar um Street com endereço válido', () => {
    const streetInput = 'Rua vai e vem'
    const sut: Either<InvalidParamError, Street> = Street.create(streetInput)
    expect(sut.isRight()).toBeTruthy()
    expect(sut).toBeInstanceOf(Right)
    expect(sut.value).toBeInstanceOf(Street)
  })
})