import { InvalidNumberPhoneError } from '@/domain/error'
import { NumberPhone } from '@/domain/value-object/number-phone'

describe('Number of Phone Value Object', () => {
  test('Deve retornar um instância de NumberPhone de telefone 8 dígitos', () => {
    const input = '(62)9999-8877'
    const sut = NumberPhone.create(input)
    expect(sut.value).toBeInstanceOf(NumberPhone)
  })

  test('Deve retornar um instância de NumberPhone de telefone 9 dígitos', () => {
    const input = '(62)9999-8877'
    const sut = NumberPhone.create(input)
    expect(sut.value).toBeInstanceOf(NumberPhone)
  })

  test('Deve retornar um InvalidNumberPhoneError se não informar number', () => {
    const input = ''
    const sut = NumberPhone.create(input)
    expect(sut.value).toBeInstanceOf(InvalidNumberPhoneError)
  })

  test('Deve retornar um InvalidNumberPhoneError se não informar number', () => {
    const input = ''
    const sut = NumberPhone.create(input)
    expect(sut.value).toBeInstanceOf(InvalidNumberPhoneError)
  })

  test('Deve retornar um InvalidNumberPhoneError se não receber no padrão phone', () => {
    const input = 'xx123456-5225'
    const sut = NumberPhone.create(input)
    expect(sut.value).toBeInstanceOf(InvalidNumberPhoneError)
  })
})
