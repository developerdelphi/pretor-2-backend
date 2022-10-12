import { InvalidQualityError } from '@/domain/entity/persona/error'
import { Quality } from '@/domain/value-object/quality'

describe('Quality Value Object', () => {
  test('Deve retornar uma instância de Quality value object', () => {
    const input = 'brasileira'
    const sut = Quality.create(input)
    expect(sut.value).toBeInstanceOf(Quality)
  })

  test('Deve retornar uma instância de Quality value object trimado', () => {
    const input = '   brasileira   '
    const sut = Quality.create(input)
    expect(sut.value).toBeInstanceOf(Quality)
    expect(sut.value).toHaveProperty('value', 'brasileira')
  })

  test('Deve retornar InvalidQualityError se informar valor inválido', () => {
    const input = ''
    const sut = Quality.create(input)
    expect(sut.value).toBeInstanceOf(InvalidQualityError)
  })

  test('Deve retornar InvalidQualityError se informar valor menor que 2 caracteres', () => {
    const input = 'a'
    const sut = Quality.create(input)
    expect(sut.value).toBeInstanceOf(InvalidQualityError)
  })

  test('Deve retornar InvalidQualityError se informar valor maior 50 caracteres', () => {
    const input = 'a'.repeat(51)
    const sut = Quality.create(input)
    expect(sut.value).toBeInstanceOf(InvalidQualityError)
  })
})
