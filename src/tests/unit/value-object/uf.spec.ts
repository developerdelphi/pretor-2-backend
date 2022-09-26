import { InvalidUfError } from '@/domain/error'
import { Uf } from '@/domain/value-object'

describe('UF Value Object', () => {
  test('Deve criar uma UF com valor válido', () => {
    const uf = Uf.create('GO')
    expect(uf.value).toBeInstanceOf(Uf)
  })

  test('Não Deve criar uma UF com valor inválido', () => {
    const ufInput = ''
    const uf = Uf.create(ufInput)
    expect(uf.value).toBeInstanceOf(InvalidUfError)
  })

  test('Não Deve criar uma UF com string menor 2 caracteres', () => {
    const ufInput = 'n'
    const uf = Uf.create(ufInput)
    expect(uf.value).toBeInstanceOf(InvalidUfError)
  })

  test('Não Deve criar uma UF com string maior 2 caracteres', () => {
    const ufInput = 'n'.repeat(10)
    const uf = Uf.create(ufInput)
    expect(uf.value).toBeInstanceOf(InvalidUfError)
  })

  test('Não Deve criar uma UF com string caracteres maiúsculas', () => {
    const ufInput = 'go'
    const uf = Uf.create(ufInput)
    expect(uf.value).toEqual({ uf: 'GO' })
  })

  test('Não Deve criar uma UF com string caracteres espaços', () => {
    const ufInput = '  GO    '
    const uf = Uf.create(ufInput)
    expect(uf.value).toEqual({ uf: 'GO' })
  })

  test('Não Deve criar uma UF que não seja estado brasileiro', () => {
    const ufInput = 'XX'
    const uf = Uf.create(ufInput)
    expect(uf.value).toBeInstanceOf(InvalidUfError)
  })
})
