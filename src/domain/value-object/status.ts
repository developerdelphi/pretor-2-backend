import { Either, left, right } from '@/shared/either'
import { InvalidStatusError } from '../error/invalid-status-error'

export class Status {
  private readonly status: string

  private constructor (status: string) {
    this.status = status
  }

  static create (statusInput: string): Either<InvalidStatusError, Status> {
    const status = statusInput ? statusInput.trim() : statusInput
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
