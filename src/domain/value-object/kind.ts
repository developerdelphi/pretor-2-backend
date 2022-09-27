import { Either, left, right } from '@/shared/either'
import { InvalidKindError } from '../error'

export class Kind {
  private readonly kind: string
  constructor (kind: string) {
    this.kind = kind
  }

  static create (kind: string): Either<InvalidKindError, Kind> {
    kind = kind.trim().toUpperCase()
    if (!Kind.isValid(kind)) return left(new InvalidKindError(kind))
    return right(new Kind(kind))
  }

  static isValid (kind: string): boolean {
    if (!kind) return false
    if (kind.length > 1) return false
    if (!kind.match('[F]|[J]')) return false
    return true
  }

  get value (): string {
    return this.kind
  }
}
