import { Persona } from '@/domain/entity'
import { Either } from '@/shared/either'

export type AddPersonaResponse = Either<Error, Persona>
