import { Persona } from '@/domain/entity'
import { InvalidKindError, InvalidNamePersonaError } from '@/domain/error'
import { Either } from '@/shared/either'

export type AddPersonaResponse = Either<InvalidNamePersonaError | InvalidKindError, Persona>
