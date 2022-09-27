import { Persona } from '@/domain/entity'
import { InvalidNamePersonaError } from '@/domain/error'
import { Either } from '@/shared/either'

export type AddPersonaResponse = Either<InvalidNamePersonaError, Persona>
