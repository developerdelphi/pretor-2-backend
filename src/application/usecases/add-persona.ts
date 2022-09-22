import { Persona } from '@/domain/entity/persona'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { PersonaModel } from '../../domain/models/persona'
import { InputPersonaData } from '../../domain/protocols'

export interface IAddPersona {
  add: (insert: InputPersonaData) => Promise<PersonaModel>
}

export class AddPersona {
  constructor (readonly personaRepository: PersonaRepository) {}
  async execute (insert: InputPersonaData): Promise<PersonaModel> {
    const persona = new Persona('valid_id', insert.name, insert.kind)
    const personaCreated = await this.personaRepository.create(persona)
    return personaCreated
  }
}
