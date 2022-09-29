import { Either } from '@/shared/either'
import { Persona } from '../entity'
import { InvalidKindError, InvalidNamePersonaError } from '../error'
import { IAddress, IDocument, InputAddressData, InputDocument, InputPhoneData, IPhone } from './'

export type PersonaOrError = Either<InvalidNamePersonaError | InvalidKindError, Persona>
export interface InputPersonaData {
  name: string
  kind: string
  address?: [InputAddressData]
  document?: [InputDocument]
  phone?: [InputPhoneData]
}

export interface IPersona {
  personaId: string
  name: string
  kind: string
  address?: [IAddress]
  phone?: [IPhone]
  document?: [IDocument]
}
