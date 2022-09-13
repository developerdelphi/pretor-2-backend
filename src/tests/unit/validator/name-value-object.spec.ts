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

  test('Deve retornar erro se o nome conter caracteres inválidos', () => {
    const name: string = 'nome with -/{}%$#@*()+123'
    expect(() => makeSut(name)).toThrow(new Error('Invalid name'))
  })

  // test('Deve retornar false se nome for menor que 5 caracteres', () => {
  //   const sut = makeSut()
  //   const isValid = sut.isValid('_no_')
  //   expect(isValid).toBeFalsy()
  // })

  // test('Deve validar nome com acentuações', () => {
  //   const sut = makeSut()
  //   const sanitizeName = 'João de Sá'
  //   const isValid = sut.isValid(sanitizeName)
  //   expect(isValid).toBeTruthy()
  // })
})
