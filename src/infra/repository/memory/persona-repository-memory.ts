import { Persona } from '@/domain/entity/persona'
import { PersonaModel } from '@/domain/models/persona'
import { PersonaRepository } from '@/domain/repository/persona-repository'

export default class PersonaRepositoryMemory implements PersonaRepository {
  personas: Persona[]
  constructor () {
    this.personas = []
  }

  async create (persona: Persona): Promise<PersonaModel> {
    this.personas.push(persona)
    const personaFake: PersonaModel = {
      persona_id: 'valid_id',
      name: persona.name,
      kind: persona.kind
    }
    return await Promise.resolve(personaFake)
  }
}
