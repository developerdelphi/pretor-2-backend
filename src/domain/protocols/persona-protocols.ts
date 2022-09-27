import { Either } from '@/shared/either'
import { Persona } from '../entity'
import { InvalidKindError, InvalidNamePersonaError } from '../error'
import { InputAddressData, InputDocument, InputPhoneData } from './'

export type PersonaOrError = Either<InvalidNamePersonaError | InvalidKindError, Persona>
export interface InputPersonaData {
  name: string
  kind: string
  address?: [InputAddressData]
  document?: [InputDocument]
  phone?: [InputPhoneData]
}
