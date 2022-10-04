import { Persona } from '@/domain/entity'
import { Qualification } from '@/domain/entity/qualification'
import { InvalidNamePersonaError } from '@/domain/error'
import { InputPersonaData, InputQualificationData } from '@/domain/protocols'
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

  test('Deve criar uma pessoa física', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = makeSut(input)
    expect(sut.value).toHaveProperty('kind', 'F')
  })

  test('Deve criar uma pessoa jurídica', () => {
    const input = { name: 'valid name', kind: 'J' }
    const sut = makeSut(input)
    expect(sut.value).toHaveProperty('kind', 'J')
  })

  test('Deve adicionar uma Qualificação', () => {
    const input: InputPersonaData = { name: 'valid name', kind: 'J' }
    const sut: Either<Error, Persona> = Persona.create(input)
    let persona
    let qualification
    if (sut.isRight()) {
      persona = sut.value
      const inputQualification: InputQualificationData = {
        sort: 'nacionalidade',
        quality: 'brasileira'
      }
      qualification = Qualification.create(inputQualification)
      if (qualification.isRight()) { persona.addQualification(qualification.value) }
    }

    expect(persona?.qualification[0]).toHaveProperty('sort', 'nacionalidade')
    expect(persona?.qualification[0]).toHaveProperty('quality', 'brasileira')
  })
})
