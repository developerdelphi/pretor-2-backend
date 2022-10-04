import { Either, right } from '@/shared/either'
import { InvalidSortError } from '../error'

export class Sort {
  private readonly sort: string
  private constructor (sort: string) {
    this.sort = sort
  }

  static create (sort: string): Either<InvalidSortError, Sort> {
    return right(new Sort(sort))
  }

  get value (): string {
    return this.sort
  }
}
