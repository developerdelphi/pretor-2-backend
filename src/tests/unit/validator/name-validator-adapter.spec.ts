import { NameValidatorAdapter } from '@/utils/name-validator-adapter'

describe('NameValidator Adapter', () => {
  test('Deve retornar false se o validator retornar false', () => {
    const sut = new NameValidatorAdapter()
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBeFalsy()
  })
})
