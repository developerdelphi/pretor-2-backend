import { Name } from '@/domain/value-object'
import { InvalidNamePersonaError } from '@/domain/error'

describe('Name Value Object', () => {
  test('Deve criar uma instância de Nome', () => {
    const nameInput = 'Pedro Alvares Cabral'
    const sut = Name.create(nameInput)
    expect(sut.value).toBeInstanceOf(Name)
    expect(sut.value).toHaveProperty('name', nameInput)
  })
  test('Deve retornar InvalidNamePersonaError se não informar nome', () => {
    const nameInput: string = ''
    const sut = Name.create(nameInput)
    expect(sut.value).toBeInstanceOf(InvalidNamePersonaError)
  })

  test('Deve retornar InvalidNamePersonaError quando nome menor 5 caracteres', () => {
    const nameInput = 'nome'
    const sut = Name.create(nameInput)
    expect(sut.value).toBeInstanceOf(InvalidNamePersonaError)
  })

  test('Deve retornar InvalidNamePersonaError quando nome maior 150 caracteres', () => {
    const nameInput = 'n'.repeat(155)
    const sut = Name.create(nameInput)
    expect(sut.value).toBeInstanceOf(InvalidNamePersonaError)
  })

  test('Deve retornar InvalidNamePersonaError nome conter caracteres inválidos', () => {
    const nameInput = 'n0m3 @/fa - %{/ //}$#2@*()+'
    const sut = Name.create(nameInput)
    expect(sut.value).toBeInstanceOf(InvalidNamePersonaError)
  })
})
