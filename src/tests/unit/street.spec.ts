import { InvalidStreetError } from '@/domain/error'
import { Street } from '@/domain/value-object/street'
import { Either, Left, Right } from '@/shared/either'

describe('Street Value Object', () => {
  test('Não deve criar se o valor informado de logradouro (street) é inválido', () => {
    const streetInput = ''
    const sut: Either<InvalidStreetError, Street> = Street.create(streetInput)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut).toBeInstanceOf(Left)
    expect(sut.value).toBeInstanceOf(InvalidStreetError)
  })

  test('Não deve criar se o valor informado de logradouro (street) menor ou igual 3 caracteres', () => {
    const streetInput = 'Rua'
    const sut: Either<InvalidStreetError, Street> = Street.create(streetInput)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut).toBeInstanceOf(Left)
    expect(sut.value).toBeInstanceOf(InvalidStreetError)
  })

  test('Não deve criar se endereço informado não contiver um logradouro válido no início da string', () => {
    const streetInput = 'Vai e Vem'
    const sut: Either<InvalidStreetError, Street> = Street.create(streetInput)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut).toBeInstanceOf(Left)
    expect(sut.value).toBeInstanceOf(InvalidStreetError)
  })

  test('Deve criar um Street com endereço válido', () => {
    const streetInput = 'Rua A'
    const sut: Either<InvalidStreetError, Street> = Street.create(streetInput)
    expect(sut.isRight()).toBeTruthy()
    expect(sut).toBeInstanceOf(Right)
    expect(sut.value).toBeInstanceOf(Street)
  })
})
