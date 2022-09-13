import { Persona } from '@/domain/entity/persona'

describe('Persona Entity', () => {
  test('Deve tentar cadastrar uma pessoa com um nome inválido', () => {
    const name = 'no'
    expect(() => new Persona(name)).toThrow(new Error('Invalid name'))
  })

  test('Deve cadastrar uma pessoa com um nome válido', () => {
    const name = 'valid name'

    const persona = new Persona(name)

    expect(persona.name.value).toBe('valid name')
  })
})