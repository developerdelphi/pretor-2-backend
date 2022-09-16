import Phone from '@/domain/entity/phone'
import { InputPhoneData } from '@/domain/protocols/phone-protocols'

describe('Phone Entity', () => {
  test('Deve criar uma instancia da classe Phone com dados válidos de uma pessoa', () => {
    const input: InputPhoneData = {
      number: 'valid_number',
      status: 'valid_status'
    }
    const sut = new Phone('1', input.number, input.status)
    expect(sut).toHaveProperty('number', 'valid_number')
    expect(sut).toHaveProperty('status', 'valid_status')
  })
})
