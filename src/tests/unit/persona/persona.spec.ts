import Address from '@/domain/entity/address'
import { Persona } from '@/domain/entity/persona'
import { inputAddressData } from '@/domain/protocols/address-protocols'
import InputPersonaData from '@/domain/protocols/persona-protocols'

const makeSut = (inputPersonaData: InputPersonaData): Persona => {
  const sut = new Persona(inputPersonaData)
  return sut
}

describe('Persona Entity', () => {
  test('Deve tentar cadastrar uma pessoa com um nome inválido', () => {
    const input = { name: 'no', kind: 'F' }
    expect(() => makeSut(input)).toThrow(new Error('Invalid name'))
  })

  test('Deve cadastrar uma pessoa com um nome válido', () => {
    const input = { name: 'valid name', kind: 'F' }
    const persona = new Persona(input)
    expect(persona.name.value).toBe('valid name')
  })

  test('Deve criar uma pessoa como pessoa física', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = new Persona(input)
    expect(sut.kind).toEqual('F')
  })

  test('Deve criar uma pessoa com endereço', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = new Persona(input)
    const address: inputAddressData = {
      personaId: 1,
      street: 'Rua Principal',
      number: 'sn',
      complement: 'Qd. 04, Lt. 12',
      district: 'Centro',
      cep: '75100-100',
      city: 'Sossego',
      uf: 'GO'
    }
    sut.addAddress(new Address(address.personaId, address.street, address.number, address.complement, address.district, address.cep, address.city, address.uf))
    expect(sut.address).toHaveLength(1)
  })
})
