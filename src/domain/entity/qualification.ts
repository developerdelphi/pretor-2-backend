import { Either, left, right } from '@/shared/either'
import { InvalidQualityError, InvalidSortError } from '../error'
import { InputQualificationData, IQualification } from '../protocols'
import { Quality } from '../value-object/quality'
import { Sort } from '../value-object/Sort'

export class Qualification implements IQualification {
  private readonly _id: string
  private readonly _sort: Sort
  private readonly _quality: Quality

  private constructor (id: string, sort: Sort, quality: Quality) {
    this._id = id
    this._sort = sort
    this._quality = quality
  }

  static create (input: InputQualificationData): Either<Error, Qualification> {
    const sortOrError: Either<Error, Sort> = Sort.create(input.sort)
    const qualityOrError: Either<Error, Quality> = Quality.create(input.quality)
    if (sortOrError.isLeft()) return left(new InvalidSortError(input.sort))
    if (qualityOrError.isLeft()) return left(new InvalidQualityError(input.quality))
    const sort: Sort = sortOrError.value
    const quality: Quality = qualityOrError.value
    return right(new Qualification(input.id ?? '', sort, quality))
  }

  get id (): string {
    return this._id
  }

  get sort (): string {
    return this._sort.value
  }

  get quality (): string {
    return this._quality.value
  }
}
