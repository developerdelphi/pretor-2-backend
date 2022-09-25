import { InvalidParamError } from '@/presentation/errors'
import { Either, left, right } from '@/shared/either'

export class Street {
  private readonly street: string

  private constructor (street: string) {
    this.street = street
    Object.freeze(this)
  }

  static create (street: string): Either<InvalidParamError, Street> {
    street = street.trim()
    if (!Street.isValid(street)) return left(new InvalidParamError('street', 'Logradouro é obrigatório'))
    return right(new Street(street))
  }

  static isValid (street: string): boolean {
    if (!street) return false
    if (street.trim().length <= 3) return false
    return true
  }

  get value (): string {
    return this.street
  }
}
