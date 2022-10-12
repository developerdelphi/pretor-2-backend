import { Persona } from '@/domain/entity/persona'
import { PersonaModel } from '@/domain/models/persona'
import { InputPersonaData } from '@/domain/protocols'
import { Either } from '@/shared/either'

export type AddPersonaResponse = Either<Error, Persona>

export interface IAddPersona {
  add: (input: InputPersonaData) => Promise<PersonaModel>
}
