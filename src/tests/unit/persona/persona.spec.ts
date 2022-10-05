import { Address, Persona } from '@/domain/entity'
import { Qualification } from '@/domain/entity/qualification'
import { InvalidNamePersonaError } from '@/domain/error'
import { InputAddressData, InputPersonaData, InputQualificationData } from '@/domain/protocols'
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
        quality: 'brasileira',
        status: 'active'
      }
      qualification = Qualification.create(inputQualification)
      if (qualification.isRight()) { persona.addQualification(qualification.value) }
    }

    expect(persona?.qualification[0]).toHaveProperty('sort', 'nacionalidade')
    expect(persona?.qualification[0]).toHaveProperty('quality', 'brasileira')
    expect(persona?.qualification[0]).toHaveProperty('status', 'active')
  })

  test('Deve adicionar um Endereço', () => {
    const input: InputPersonaData = { name: 'valid name', kind: 'J' }
    const sut: Either<Error, Persona> = Persona.create(input)
    let persona
    let address
    if (sut.isRight()) {
      persona = sut.value
      const inputAddress: InputAddressData = {
        street: 'Rua vai e vem',
        number: '100',
        complement: 'casa 1',
        district: 'centro',
        city: 'Goiânia',
        uf: 'GO',
        cep: '74100-100',
        status: 'active'
      }
      address = Address.create(inputAddress)
      if (address.isRight()) { persona.addAddress(address.value) }
    }

    expect(persona?.address[0]).toHaveProperty('street', 'Rua vai e vem')
    expect(persona?.address[0]).toHaveProperty('city', 'Goiânia')
    expect(persona?.address[0]).toHaveProperty('uf', 'GO')
    expect(persona?.address[0]).toHaveProperty('number', '100')
    expect(persona?.address[0]).toHaveProperty('complement', 'casa 1')
    expect(persona?.address[0]).toHaveProperty('district', 'centro')
    expect(persona?.address[0]).toHaveProperty('cep', '74100-100')
    expect(persona?.address[0]).toHaveProperty('status', 'active')
  })
})
