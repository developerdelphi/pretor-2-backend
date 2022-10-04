import { Sort } from '@/domain/value-object/Sort'

describe('Sort Value Object', () => {
  test('Deve retornar uma instância de value object Sort', () => {
    const input = 'nacionalidade'
    const sut = Sort.create(input)
    expect(sut.value).toBeInstanceOf(Sort)
    expect(sut.value).toHaveProperty('value', 'nacionalidade')
  })
})
