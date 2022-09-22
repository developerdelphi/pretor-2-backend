import { Persona } from '@/domain/entity/persona'
import { PersonaRepository } from '@/domain/repository/persona-repository'

export default class PersonaRepositoryMemory implements PersonaRepository {
  personas: Persona[]
  constructor () {
    this.personas = []
  }

  async create (persona: Persona): Promise<void> {
    this.personas.push(persona)
    return await Promise.resolve()
  }
}
