import { Either, left, right } from '@/shared/either'
import { InvalidCpfError, InvalidParamError, InvalidStatusError } from '../error'
import { DocumentOrError, InputDocumentData } from '../protocols'
import { Status } from '../value-object'
import { Cpf } from '../value-object/cpf'

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
    const validated: Either<Error, String> = this.validator(input.kind, input.identifier)

    if (validated.isLeft()) return left(validated.value)
    const identifier = validated.value

    const statusOrError: Either<InvalidStatusError, Status> = Status.create(input.status)
    if (statusOrError.isLeft()) return left(new InvalidStatusError(input.status))
    const status: Status = statusOrError.value

    return right(new Document('0', input.kind, identifier.valueOf(), status))
  }

  private static validator (kind: string, identifier: string): Either<Error, String> {
    if (!kind) return left(new InvalidParamError('kind', 'O campo tipo do documento é inválido'))
    if (kind === 'CPF') {
      const cpfOrError = Cpf.create(identifier)
      if (cpfOrError.isLeft()) return left(new InvalidCpfError(identifier))
      const cpf = cpfOrError.value
      return right(cpf.value)
    }
    return right(identifier)
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
