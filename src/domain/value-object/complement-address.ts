import { Either, left, right } from '@/shared/either'
import { InvalidComplementAddressError } from '@/domain/error'

export class ComplementAddress {
  private constructor (readonly complement: string) { }

  static create (complement: string): Either<InvalidComplementAddressError, ComplementAddress> {
    complement = complement.trim()
    if (!ComplementAddress.isValid(complement)) return left(new InvalidComplementAddressError(complement))
    return right(new ComplementAddress(complement))
  }

  static isValid (complement: string): boolean {
    // if (!complement) return false
    if (complement.length > 100) return false
    return true
  }

  get value (): string {
    return this.complement
  }
}
