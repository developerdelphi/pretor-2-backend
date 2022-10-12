import { Either, left, right } from '@/shared/either'
import { InvalidNamePersonaError } from '../entity/persona/error'

export class Name {
  private readonly name: string
  private constructor (name: string) {
    this.name = name
  }

  static create (nameInput: string): Either<InvalidNamePersonaError, Name> {
    const name = nameInput ? nameInput.trim() : nameInput
    if (!Name.isValid(name)) return left(new InvalidNamePersonaError(name))
    return right(new Name(name))
  }

  static isValid (name: string): boolean {
    if (!name) return false
    if (name.length < 5 || name.length > 150) return false

    const blackListChar = /^[0-9_]|[#$%&"*()_=+@!'?:,{}\\[\]//\\]$/gi
    const contentInvalidChar = blackListChar.test(name)
    if (contentInvalidChar) return false

    return true
  }

  get value (): string {
    return this.name
  }
}
