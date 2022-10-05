import { Either, left, right } from '@/shared/either'
import { InvalidCepError } from '../error/invalid-cep-error'

export class Cep {
  private readonly cep: string
  constructor (cep: string) {
    this.cep = cep
  }

  static create (cepInput: string): Either<InvalidCepError, Cep> {
    const cep = cepInput ? cepInput.trim() : cepInput
    if (!Cep.isValid(cep)) return left(new InvalidCepError(cep))
    return right(new Cep(cep))
  }

  static isValid (cep: string): boolean {
    if (!cep) return false
    if (!(cep.length === 9)) return false

    const cepPattern = /^[0-9]{5}-[0-9]{3}$/
    const isValidCep = cepPattern.test(cep)
    if (!isValidCep) return false
    return true
  }

  get value (): string {
    return this.cep
  }
}
