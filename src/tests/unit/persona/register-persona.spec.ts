import { Persona } from '@/domain/entity/persona'

describe('Cadastro de Persona', () => {
  it('Deve garantir que recebeu um nome válido', () => {
    const input = {
      name: 'valid_name'
    }
    const sut = new Persona(input.name)

    expect(sut.name.value).toBe('valid_name')
  })
})
