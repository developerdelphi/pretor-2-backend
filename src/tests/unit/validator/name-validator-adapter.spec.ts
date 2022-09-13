import { NameValidatorAdapter } from '@/utils/name-validator-adapter'

const makeSut = (): NameValidatorAdapter => {
  const sut = new NameValidatorAdapter()
  return sut
}

describe('NameValidator Adapter', () => {
  test('Deve retornar false se o validator retornar false', () => {
    const sut = makeSut()
    const name: string = ''
    const isValid = sut.isValid(name)
    expect(isValid).toBeFalsy()
  })

  test('Deve retornar false se nome conter caracteres inválidos', () => {
    const sut = makeSut()
    const sanitizeName = ''
    const isValid = sut.isValid(sanitizeName)
    expect(isValid).toBeFalsy()
  })

  test('Deve retornar false se nome for menor que 5 caracteres', () => {
    const sut = makeSut()
    const isValid = sut.isValid('_no_')
    expect(isValid).toBeFalsy()
  })

  test('Deve validar nome com acentuações', () => {
    const sut = makeSut()
    const sanitizeName = 'João de Sá'
    const isValid = sut.isValid(sanitizeName)
    expect(isValid).toBeTruthy()
  })
})
