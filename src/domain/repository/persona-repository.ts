import { Either } from '@/shared/either'
import { Persona } from '../entity/persona'
import { InvalidNamePersonaError } from '../error'
// import { PersonaModel } from '../models/persona'
export interface PersonaRepository {
  create: (persona: Persona) => Promise<Either<InvalidNamePersonaError, Persona>>
}
