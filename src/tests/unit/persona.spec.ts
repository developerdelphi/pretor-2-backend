import { Persona } from '@/domain/entity/persona'

describe('Persona Entity', () => {
  test('Deve cadastrar uma pessoa com um nome válido', () => {
    const name = 'valid_name'

    const persona = new Persona(name)

    expect(persona.name).toBe('valid_name')
  })
})
