import { Either, left, right } from '@/shared/either'
import { InvalidSortError } from '../error'
import { InputQualificationData, IQualification } from '../protocols'
import { Sort } from '../value-object/Sort'

export class Qualification implements IQualification {
  private readonly _id: string
  private readonly _sort: Sort

  private constructor (id: string, sort: Sort) {
    this._id = id
    this._sort = sort
  }

  static create (input: InputQualificationData): Either<Error, Qualification> {
    const sortOrError: Either<Error, Sort> = Sort.create(input.sort)
    if (sortOrError.isLeft()) return left(new InvalidSortError(input.sort))
    const sort: Sort = sortOrError.value
    return right(new Qualification(input.id ?? '', sort))
  }

  get id (): string {
    return this._id
  }

  get sort (): string {
    return this._sort.value
  }
}
