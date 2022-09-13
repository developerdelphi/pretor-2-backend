import { Persona } from '@/domain/entity/persona'

describe('Cadastro de Persona', () => {
  it('Deve garantir que recebeu um nome válido', () => {
    const input = {
      name: 'valid name',
      kind: 'F'
    }
    const sut = new Persona(input)

    expect(sut.name.value).toBe('valid name')
  })
})
