import { Persona } from '@/domain/entity/persona'

describe('Persona Entity', () => {
  test('Deve cadastrar uma pessoa com um nome válido', () => {
    const name = 'valid_name'

    const persona = new Persona(name)

    expect(persona.name).toBe('valid_name')
  })

  test('Deve tentar cadastrar uma pessoa com um nome inválido', () => {
    const name = 'no'
    expect(() => new Persona(name)).toThrow(new Error('Invalid name'))
  })
})
