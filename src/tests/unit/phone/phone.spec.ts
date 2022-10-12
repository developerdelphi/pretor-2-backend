import { Phone } from '@/domain/entity/persona'
import { InvalidNumberPhoneError } from '@/domain/entity/persona/error'
import { InputPhoneData } from '@/domain/protocols/phone-protocols'

describe('Phone Entity', () => {
  test('Deve criar uma instancia da classe Phone', () => {
    const input: InputPhoneData = {
      number: '(62)99999-8877',
      status: 'active'
    }
    const sut = Phone.create(input)
    expect(sut.value).toBeInstanceOf(Phone)
  })

  test('Deve retornar InvalidNumberPhoneError tentar cadastrar phone inválido', () => {
    const input: InputPhoneData = {
      number: '',
      status: 'active'
    }
    const sut = Phone.create(input)
    expect(sut.value).toBeInstanceOf(InvalidNumberPhoneError)
  })
})
