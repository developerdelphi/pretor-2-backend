import { Persona } from '@/domain/entity'
import { InvalidNamePersonaError } from '@/domain/error'
import { InputPersonaData } from '@/domain/protocols'

import { Either } from '@/shared/either'

const makeSut = (inputPersonaData: InputPersonaData): Either<InvalidNamePersonaError, Persona> => {
  const sut = Persona.create(inputPersonaData)
  return sut
}

describe('Persona Entity', () => {
  test('Deve retornar um InvalidNameError ao tentar cadastrar uma pessoa com um nome inválido', () => {
    const input = { name: 'no', kind: 'F' }
    const sut = makeSut(input)
    expect(sut.value).toBeInstanceOf(InvalidNamePersonaError)
  })

  test('Deve cadastrar uma pessoa com um nome válido', () => {
    const input: InputPersonaData = { name: 'valid name', kind: 'F' }
    const sut: Either<InvalidNamePersonaError, Persona> = makeSut(input)
    const persona = sut.value
    expect(persona).toHaveProperty('name', 'valid name')
  })

  test('Deve criar uma pessoa como pessoa física', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = makeSut(input)
    expect(sut.value).toHaveProperty('kind', 'F')
  })
})
