import { Either, left, right } from '@/shared/either'
import { InvalidNumberPhoneError } from '../error'

export class NumberPhone {
  private readonly number: string

  private constructor (number: string) {
    this.number = number
  }

  static create (number: string): Either<InvalidNumberPhoneError, NumberPhone> {
    if (!NumberPhone.isValid(number)) return left(new InvalidNumberPhoneError(number))
    return right(new NumberPhone(number))
  }

  static isValid (number: string): boolean {
    if (!number) return false
    const phonePattern = /^(?:\()[0-9]{2}(?:\))?[0-9]{4,5}(?:-)[0-9]{4}$/g
    if (!phonePattern.test(number)) return false
    return true
  }
}
