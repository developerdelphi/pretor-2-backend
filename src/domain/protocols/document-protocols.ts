import { Either } from '@/shared/either'
import { InvalidStatusError } from '../error'

export interface InputDocumentData {
  kind: string
  identifier: string
  status: string
}

export interface IDocument {
  id: string
  kind: string
  identifier: string
  status: string
}

export type DocumentOrError = Either<InvalidStatusError, IDocument>
