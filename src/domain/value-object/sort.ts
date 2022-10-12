import { Either, left, right } from '@/shared/either'
import { InvalidSortError } from '@/domain/entity/persona/error'

export class Sort {
  private readonly sort: string
  private constructor (sort: string) {
    this.sort = sort
  }

  static create (sortInput: string): Either<InvalidSortError, Sort> {
    const sort = sortInput ? sortInput.trim() : sortInput
    if (!Sort.isValid(sort)) return left(new InvalidSortError(sort))
    return right(new Sort(sort))
  }

  static isValid (sort: string): boolean {
    if (!sort) return false
    if ((sort.length > 30) || (sort.length < 2)) return false
    return true
  }

  get value (): string {
    return this.sort
  }
}
