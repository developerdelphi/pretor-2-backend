import { Either } from '@/shared/either'
import { Persona } from '../entity/persona'
import { InvalidKindError, InvalidNamePersonaError } from '@/domain/entity/persona/error'
import { IAddress, IDocument, InputAddressData, InputDocumentData, InputPhoneData, InputQualificationData, IPhone } from './'

export type PersonaOrError = Either<InvalidNamePersonaError | InvalidKindError, Persona>
export interface InputPersonaData {
  name: string
  kind: string
  address?: [InputAddressData]
  document?: [InputDocumentData]
  phone?: [InputPhoneData]
  qualification?: [InputQualificationData]
}

export interface IPersona {
  personaId: string
  name: string
  kind: string
  address?: [IAddress]
  phone?: [IPhone]
  document?: [IDocument]
}
