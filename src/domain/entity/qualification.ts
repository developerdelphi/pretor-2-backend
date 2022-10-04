import { Either, right } from '@/shared/either'
import { InputQualificationData, IQualification } from '../protocols'

export class Qualification implements IQualification {
  private readonly _id: string
  private constructor (id: string) {
    this._id = id
  }

  static create (input: InputQualificationData): Either<Error, Qualification> {
    return right(new Qualification(input.id ?? ''))
  }

  get id (): string {
    return this._id
  }
}
