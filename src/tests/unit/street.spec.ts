import { Street } from '@/domain/value-object/street'

describe('Street Value Object', () => {
  test('Deve construir uma classe com valores válidos', () => {
    const street: any = Street.create('Rua Principal')
    expect(street.value).toBe('Rua Principal')
  })

  test('Deve retornar um value trimado', () => {
    const street: any = Street.create('  Rua Principal       ')
    expect(street.value).toBe('Rua Principal')
  })
})
