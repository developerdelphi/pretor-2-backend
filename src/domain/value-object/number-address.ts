import { Either, left, right } from '@/shared/either'
import { InvalidNumberAddressError } from '../error/invalid-number-address-error'

export class NumberAddress {
  private readonly number: string
  private constructor (number: string) {
    this.number = number
  }

  static create (numberInput: string): Either<InvalidNumberAddressError, NumberAddress> {
    const number = numberInput ? numberInput.trim() : numberInput
    if (!NumberAddress.isValid(number)) return left(new InvalidNumberAddressError(number))
    return right(new NumberAddress(number))
  }

  static isValid (number: string): boolean {
    if (number.length > 20) return false
    return true
  }

  get value (): string {
    return this.number
  }
}
