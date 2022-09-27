import { InvalidKindError } from '@/domain/error'
import { Kind } from '@/domain/value-object/kind'

describe('Kind Value Object', () => {
  test('Deve retornar InvalidKindError para Tipo de Pessoa diferente de "F" (Física) "J" (Jurídica)', () => {
    const sut = Kind.create('S')
    expect(sut.value).toBeInstanceOf(InvalidKindError)
  })
  test('Deve retornar InvalidKindError para Tipo de Pessoa menor que 1', () => {
    const sut = Kind.create('')
    expect(sut.value).toBeInstanceOf(InvalidKindError)
  })
  test('Deve retornar InvalidKindError para Tipo de Pessoa maior que 1', () => {
    const sut = Kind.create('FF')
    expect(sut.value).toBeInstanceOf(InvalidKindError)
  })
  test('Deve retornar Kind para Tipo de Pessoa física', () => {
    const sut = Kind.create('F')
    const kind = sut.value
    expect(sut.value).toBeInstanceOf(Kind)
    expect(kind).toHaveProperty('kind', 'F')
  })
  test('Deve retornar Kind para Tipo de Pessoa jurídica', () => {
    const sut = Kind.create('J')
    const kind = sut.value
    expect(sut.value).toBeInstanceOf(Kind)
    expect(kind).toHaveProperty('kind', 'J')
  })
})
