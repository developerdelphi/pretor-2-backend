import { InvalidCepError } from '@/domain/error'
import { Cep } from '@/domain/value-object'

describe('CEP Value Object', () => {
  test('Deve criar uma CEP com valor válido', () => {
    const cep = Cep.create('75000-000')
    expect(cep.value).toBeInstanceOf(Cep)
  })

  test.skip('Não Deve criar uma cep com valor inválido', () => {
    const cepInput = ''
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test.skip('Não Deve criar uma cep com string menor 2 caracteres', () => {
    const cepInput = 'n'
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test.skip('Não Deve criar uma cep com string maior 2 caracteres', () => {
    const cepInput = 'n'.repeat(10)
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test.skip('Não Deve criar uma cep com string caracteres maiúsculas', () => {
    const cepInput = 'go'
    const cep = Cep.create(cepInput)
    expect(cep.value).toEqual({ cep: 'GO' })
  })

  test.skip('Não Deve criar uma cep com string caracteres espaços', () => {
    const cepInput = '  GO    '
    const cep = Cep.create(cepInput)
    expect(cep.value).toEqual({ cep: 'GO' })
  })

  test.skip('Não Deve criar uma cep que não seja estado brasileiro', () => {
    const cepInput = 'XX'
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })
})
