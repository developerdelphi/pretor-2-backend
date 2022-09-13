import { NameValidatorAdapter } from '@/utils/name-validator-adapter'

describe('NameValidator Adapter', () => {
  test('Deve retornar false se o validator retornar false', () => {
    const sut = new NameValidatorAdapter()
    const name: string = ''
    const isValid = sut.isValid(name)
    expect(isValid).toBeFalsy()
  })

  test('Deve retornar false se nome conter caracteres inválidos', () => {
    const sut = new NameValidatorAdapter()
    const sanitizeName = ''
    const isValid = sut.isValid(sanitizeName)
    expect(isValid).toBeFalsy()
  })

  test('Deve retornar false se nome for menor que 5 caracteres', () => {
    const sut = new NameValidatorAdapter()
    const isValid = sut.isValid('_no_')
    expect(isValid).toBeFalsy()
  })

  test('Deve validar nome com acentuações', () => {
    const sut = new NameValidatorAdapter()
    const sanitizeName = 'João de Sá'
    const isValid = sut.isValid(sanitizeName)
    expect(isValid).toBeTruthy()
  })
})
