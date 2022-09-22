import { Persona } from '../entity/persona'
import { PersonaModel } from '../models/persona'
export interface PersonaRepository {
  create: (persona: Persona) => Promise<PersonaModel>
}
