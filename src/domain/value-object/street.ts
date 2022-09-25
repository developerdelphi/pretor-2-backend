import { InvalidParamError } from '@/presentation/errors'

export class Street {
  private readonly street: string

  private constructor (street: string) {
    this.street = street
    Object.freeze(this)
  }

  static create (street: string): InvalidParamError | Street {
    if (!Street.isValid(street)) return new InvalidParamError('street', 'Logradouro é obrigatório')
    return new Street(street.trim())
  }

  static isValid (street: string): boolean {
    if (!street) return false
    // if (street.trim().length <= 3) return false
    return true
  }

  get value (): string {
    return this.street
  }
}
