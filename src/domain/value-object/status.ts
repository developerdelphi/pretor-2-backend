import { Either, left, right } from '@/shared/either'
import { InvalidStatusError } from '../error/invalid-status-error'

export class Status {
  private readonly status: string

  private constructor (status: string) {
    this.status = status
  }

  static create (status: string): Either<InvalidStatusError, Status> {
    if (!Status.isValid(status)) return left(new InvalidStatusError(status))
    return right(new Status(status))
  }

  static isValid (status: string): boolean {
    if (!status) return false
    if (!status.match('active|inactive')) return false

    return true
  }

  get value (): string {
    return this.status
  }
}
