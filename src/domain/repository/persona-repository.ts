import { Persona } from '@/domain/entity/persona/persona'
import { PersonaOrError } from '@/domain/protocols'
export interface PersonaRepository {
  create: (persona: Persona) => Promise<PersonaOrError>
}
