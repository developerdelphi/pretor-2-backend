import { Either, right } from '@/shared/either'
import { InvalidCepError } from '../error/invalid-cep-error'

export class Cep {
  private readonly cep: string
  constructor (cep: string) {
    this.cep = cep
  }

  static create (cep: string): Either<InvalidCepError, Cep> {
    return right(new Cep(cep))
  }

  get value (): string {
    return this.cep
  }
}
