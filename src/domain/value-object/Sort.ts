import { Either, left, right } from '@/shared/either'
import { InvalidSortError } from '../error'

export class Sort {
  private readonly sort: string
  private constructor (sort: string) {
    this.sort = sort
  }

  static create (sort: string): Either<InvalidSortError, Sort> {
    sort = sort.trim()
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
