import { Persona } from '@/domain/entity/persona'
import { PersonaRepository } from '@/domain/repository/persona-repository'

export class PersonaRepositoryPostGres implements PersonaRepository {
  async create (persona: Persona): Promise<void> {
    return await new Promise(resolve => (resolve()))
  }
}
