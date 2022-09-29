import { InvalidNumberAddressError } from '@/domain/error'
import { NumberAddress } from '@/domain/value-object'

describe('Number of Address Value Object', () => {
  test('Deve criar uma instância da class Number', () => {
    const sut = NumberAddress.create('123')
    expect(sut.value).toBeInstanceOf(NumberAddress)
  })

  test('Deve criar uma instância da class Number valor null', () => {
    const sut = NumberAddress.create('')
    expect(sut.value).toBeInstanceOf(NumberAddress)
    expect(sut.value).toHaveProperty('value', '')
  })

  test('Deve retornar InvalidNumberAddressError se informado valor inválido', () => {
    const sut = NumberAddress.create('2'.repeat(25))
    expect(sut.value).toBeInstanceOf(InvalidNumberAddressError)
  })
})
