import { Either, left, right } from '@/shared/either'
import { InvalidStatusError } from '../error'
import { DocumentOrError, InputDocumentData } from '../protocols'
import { Status } from '../value-object'

export class Document {
  private readonly _id: string
  private readonly _kind: string
  private readonly _identifier: string
  private readonly _status: Status

  private constructor (documentId: string, kind: string, identifier: string, status: Status) {
    this._id = documentId
    this._kind = kind
    this._identifier = identifier
    this._status = status
  }

  static create (input: InputDocumentData): DocumentOrError {
    const statusOrError: Either<InvalidStatusError, Status> = Status.create(input.status)
    if (statusOrError.isLeft()) return left(new InvalidStatusError(input.status))
    const status: Status = statusOrError.value
    return right(new Document('0', input.kind, input.identifier, status))
  }

  get id (): string {
    return this._id
  }

  get status (): string {
    return this._status.value
  }

  get kind (): string {
    return this._kind
  }

  get identifier (): string {
    return this._identifier
  }
}
