import { Persona } from '@/domain/entity/persona'
import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { PersonaModel } from '../../domain/models/persona'
import { InputPersonaData } from '../../domain/protocols'

export interface IAddPersona {
  add: (insert: InputPersonaData) => Promise<PersonaModel>
}

export class AddPersona {
  personaRepository: PersonaRepository
  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.personaRepository = repositoryFactory.createPersonaRepository()
  }

  async execute (insert: InputPersonaData): Promise<PersonaModel> {
    const persona = new Persona('valid_id', insert.name, insert.kind)
    const personaCreated = await this.personaRepository.create(persona)
    return personaCreated
  }
}
