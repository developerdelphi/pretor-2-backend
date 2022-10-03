import { Either } from '@/shared/either'

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

export type DocumentOrError = Either<Error, IDocument>
