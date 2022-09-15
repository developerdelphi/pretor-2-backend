import Phone from '@/domain/entity/phone'

describe('Phone Entity', () => {
  test('Deve criar uma instancia da classe Phone com dados válidos de uma pessoa', () => {
    const input = {
      personaId: 1,
      number: 'valid_number',
      status: 'valid_status'
    }
    const sut = new Phone(input.personaId, input.number, input.status)
    expect(sut).toHaveProperty('personaId', 1)
    expect(sut).toHaveProperty('number', 'valid_number')
    expect(sut).toHaveProperty('status', 'valid_status')
  })
})
