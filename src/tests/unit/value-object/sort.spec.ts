import { InvalidSortError } from '@/domain/error'
import { Sort } from '@/domain/value-object/Sort'

describe('Sort Value Object', () => {
  test('Deve retornar uma instância de value object Sort', () => {
    const input = 'nacionalidade'
    const sut = Sort.create(input)
    expect(sut.value).toBeInstanceOf(Sort)
    expect(sut.value).toHaveProperty('value', 'nacionalidade')
  })

  test('Deve retornar InvalidSortError ao informar valor inválido', () => {
    const input = ''
    const sut = Sort.create(input)
    expect(sut.value).toBeInstanceOf(InvalidSortError)
  })

  test('Deve retornar InvalidSortError ao informar valor maior que 30 caracteres', () => {
    const input = 'a'.repeat(31)
    const sut = Sort.create(input)
    expect(sut.value).toBeInstanceOf(InvalidSortError)
  })

  test('Deve retornar InvalidSortError ao informar valor menor que 2 caracteres', () => {
    const input = 'a'
    const sut = Sort.create(input)
    expect(sut.value).toBeInstanceOf(InvalidSortError)
  })

  test('Deve retornar uma instância de value object Sort trimada', () => {
    const input = '    nacionalidade  '
    const sut = Sort.create(input)
    expect(sut.value).toBeInstanceOf(Sort)
    expect(sut.value).toHaveProperty('value', 'nacionalidade')
  })
})
