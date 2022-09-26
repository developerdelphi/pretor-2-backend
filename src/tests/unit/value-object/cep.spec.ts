import { InvalidCepError } from '@/domain/error'
import { Cep } from '@/domain/value-object'

describe('CEP Value Object', () => {
  test('Deve criar uma CEP com valor válido', () => {
    const cep = Cep.create('75000-000')
    expect(cep.value).toBeInstanceOf(Cep)
  })

  test('Não Deve criar uma cep com valor inválido', () => {
    const cepInput = ''
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test('Não Deve criar uma cep com string menor 9 caracteres', () => {
    const cepInput = '75000'
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test('Não Deve criar uma cep com string maior 9 caracteres', () => {
    const cepInput = 'n'.repeat(10)
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test('Não Deve criar uma cep foram do padrão ddddd-ddd', () => {
    const cepInput = 'abcde-000'
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })

  test('Não Deve criar uma cep com string caracteres espaços', () => {
    const cepInput = '  GO    '
    const cep = Cep.create(cepInput)
    expect(cep.value).toBeInstanceOf(InvalidCepError)
  })
})
