import { Either, left, right } from '@/shared/either'
import { InvalidQualityError, InvalidSortError, InvalidStatusError } from '@/domain/entity/persona/error'
import { InputQualificationData, IQualification } from '../../protocols'
import { Status } from '../../value-object'
import { Quality } from '../../value-object/quality'
import { Sort } from '../../value-object/sort'

export class Qualification implements IQualification {
  private readonly _id: string
  private readonly _sort: Sort
  private readonly _quality: Quality
  private readonly _status: Status

  private constructor (id: string, sort: Sort, quality: Quality, status: Status) {
    this._id = id
    this._sort = sort
    this._quality = quality
    this._status = status
  }

  static create (input: InputQualificationData): Either<Error, Qualification> {
    const sortOrError: Either<Error, Sort> = Sort.create(input.sort)
    const qualityOrError: Either<Error, Quality> = Quality.create(input.quality)
    const statusOrError: Either<Error, Status> = Status.create(input.status)
    if (sortOrError.isLeft()) return left(new InvalidSortError(input.sort))
    if (qualityOrError.isLeft()) return left(new InvalidQualityError(input.quality))
    if (statusOrError.isLeft()) return left(new InvalidStatusError(input.status))
    const sort: Sort = sortOrError.value
    const quality: Quality = qualityOrError.value
    const status: Status = statusOrError.value
    return right(new Qualification(input.id ?? '', sort, quality, status))
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

  get status (): string {
    return this._status.value
  }
}
