import { Persona } from '@/domain/entity/persona'
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
})
