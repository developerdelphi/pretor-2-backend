import InvalidEmailError from '@/domain/error/invalid-email-error'
import { Email } from '@/domain/value-object/email'
import { Either, Left, Right } from '@/shared/either'

describe('Email Value Object', () => {
  test('Deve validar um email com endereço correto', () => {
    expect(Email.isValid('valid-email123@com.br')).toBe(true)
  })

  test('Deve invalidar email sem o caractere "@"', () => {
    expect(Email.isValid('valid-email123com.br')).toBe(false)
  })

  test('Deve invalidar email com usuário [LP] tendo mais de 64 caracteres', () => {
    let localPart = ''
    for (let i = 0; i <= 65; i++) localPart += 'c'
    expect(Email.isValid(`${localPart}@com.br`)).toBe(false)
  })

  test('Deve invalidar email com usuário [LP] igual 0 caracteres', () => {
    const localPart = ''
    expect(Email.isValid(`${localPart}@com.br`)).toBe(false)
  })

  test('Deve invalidar email com usuário [LP] caracteres inválidos "!#$%&\'*+-/=?^_`{|}~"', () => {
    const localPart = '%'
    expect(Email.isValid(`${localPart}@com.br`)).toBe(false)
  })

  test('Deve invalidar email com usuário [LP] iniciando com um ou mais "." (dot)', () => {
    const localPart = '.invalid_email'
    expect(Email.isValid(`${localPart}@com.br`)).toBe(false)
  })

  test('Deve invalidar email com usuário [LP] iniciando com espaço(s)', () => {
    const localPart = ' invalid_email'
    expect(Email.isValid(`${localPart}@com.br`)).toBe(false)
  })

  test('Deve invalidar email com domínio [D] tendo mais de 63 caracteres', () => {
    let domain = ''
    for (let i = 0; i <= 65; i++) domain += 'c'
    expect(Email.isValid(`valid_email@${domain}.com.br`)).toBe(false)
  })

  test('Deve invalidar email com domínio [D] nulo', () => {
    const domain = ''
    expect(Email.isValid(`valid_email@${domain}`)).toBe(false)
  })

  test('Deve invalidar email com value nulo', () => {
    const emailData = ''
    expect(Email.isValid(emailData)).toBe(false)
  })

  test('Deve invalidar email com maior que 128 caracteres', () => {
    let localPart = ''
    let domain = ''
    for (let i = 0; i <= 63; i++) {
      localPart += 'l'
      domain += 'd'
    }
    expect(Email.isValid(`${localPart}@${domain}.com`)).toBe(false)
  })

  test('Não deve criar um email com endereço inválido', () => {
    const emailData = 'invalid_email@'
    const email: Either<InvalidEmailError, Email> = Email.create(emailData)
    expect(email.isLeft()).toBeTruthy()
    expect(email).toBeInstanceOf(Left)
    expect(email.value).toBeInstanceOf(InvalidEmailError)
  })

  test('Deve criar um email com endereço válido', () => {
    const emailData = 'valid-email123@mail.com.br'
    const email: Either<InvalidEmailError, Email> = Email.create(emailData)
    expect(email.isRight()).toBeTruthy()
    expect(email).toBeInstanceOf(Right)
    expect(email.value).toBeInstanceOf(Email)
  })
})
