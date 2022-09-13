import Name from '@/domain/entity/name'

const makeSut = (nameData: string): Name => {
  const sut = new Name(nameData)
  return sut
}

describe('Name Value Object', () => {
  test('Deve retornar erro se não informar nome', () => {
    const name: string = ''
    expect(() => makeSut(name)).toThrow(new Error('Invalid name'))
  })

  test('Deve retornar nome sem conter caracteres inválidos', () => {
    const name: string = 'nome with -/{}%$#@*()+123'
    const sut = makeSut(name)
    expect(sut.value).toEqual('nome with')
  })

  test('Deve retornar erro se nome for menor que 5 caracteres', () => {
    const name: string = 'nome'
    expect(() => makeSut(name)).toThrow(new Error('Invalid name'))
  })

  test('Deve validar nome com acentuações', () => {
    const name = 'João Antônio de Sá'
    const sut = makeSut(name)

    expect(sut.value).toEqual(name)
  })
})
