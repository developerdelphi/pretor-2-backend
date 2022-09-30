import { Either, right } from '@/shared/either'
import { InvalidParamError } from '../error'
import { InputDocumentData } from '../protocols'

type DocumentOrError = Either<InvalidParamError, Document>
export class Document {
  private readonly _id: string
  private readonly _type: string
  private readonly _identifier: string
  private readonly _status: string

  private constructor (readonly documentId: string, readonly type: string, readonly identifier: string, readonly status: string) {
    this._id = documentId
    this._type = type
    this._identifier = identifier
    this._status = status
  }

  static create (input: InputDocumentData): DocumentOrError {
    return right(new Document('0', input.type, input.identifier, input.status))
  }

  get id (): string {
    return this._id
  }
}
