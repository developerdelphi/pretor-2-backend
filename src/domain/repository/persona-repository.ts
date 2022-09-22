import { Persona } from '../entity/persona'
export interface PersonaRepository {
  create: (persona: Persona) => Promise<void>
}
