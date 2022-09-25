import InvalidEmailError from '../error/invalid-email-error'

export class Email {
  private readonly email: string

  private constructor (email: string) {
    this.email = email
    Object.freeze(this)
  }

  static create (email: string): InvalidEmailError | Email {
    if (!Email.isValid(email)) return new InvalidEmailError(email)
    return new Email(email)
  }

  static isValid (email: string): boolean {
    const regExp = /^[^.\b\s][a-zA-Z0-9\\.\\-]{1,64}@(([\w-]+(\.[\w]{2,}){1,3}){1,64})$/
    if (!email || email.length > 128) return false
    if (!regExp.test(email)) return false
    return true
  }

  get value (): string {
    return this.email
  }
}
