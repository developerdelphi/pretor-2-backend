import { InvalidCpfError } from '@/domain/entity/persona/error'
import { Cpf } from '@/domain/value-object/cpf'

describe('CPF Value Object', () => {
  test('Deve criar uma instância de CPF', () => {
    const sut = Cpf.create('935.411.347-80')
    expect(sut.value).toBeInstanceOf(Cpf)
  })

  test('Deve criar uma instância de CPF', () => {
    const sut = Cpf.create('357.188.378-05')
    expect(sut.value).toBeInstanceOf(Cpf)
  })

  test('Deve criar uma instância de CPF', () => {
    const sut = Cpf.create('987.654.321-00')
    expect(sut.value).toBeInstanceOf(Cpf)
  })

  test('Deve retornar InvalidCpfError se não informar CPF', () => {
    const sut = Cpf.create('')
    expect(sut.value).toBeInstanceOf(InvalidCpfError)
  })

  test('Deve retornar InvalidCpfError se informar CPF diferente de 14 caracteres', () => {
    const sut = Cpf.create('111.111')
    expect(sut.value).toBeInstanceOf(InvalidCpfError)
  })

  test('Deve retornar InvalidCpfError se informar CPF todos caracteres iguais', () => {
    const sut = Cpf.create('111.111.111-11')
    expect(sut.value).toBeInstanceOf(InvalidCpfError)
  })

  test('Deve retornar InvalidCpfError se informar CPF inválido', () => {
    const sut = Cpf.create('123.456.789-10')
    expect(sut.value).toBeInstanceOf(InvalidCpfError)
  })
})
