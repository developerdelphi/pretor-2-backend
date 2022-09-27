import { Persona } from '@/domain/entity/persona'
import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { PersonaModel } from '@/domain/models/persona'
import { InputPersonaData } from '@/domain/protocols'
import { left } from '@/shared/either'
import { AddPersonaResponse } from '../protocols/add-persona-response'

export interface IAddPersona {
  add: (insert: InputPersonaData) => Promise<PersonaModel>
}

export class AddPersona {
  personaRepository: PersonaRepository
  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.personaRepository = repositoryFactory.createPersonaRepository()
  }

  async execute (insert: InputPersonaData): Promise<AddPersonaResponse> {
    const personaOrError = Persona.create({ name: insert.name, kind: insert.kind })

    if (personaOrError.isLeft()) return left(personaOrError.value)
    const persona: Persona = personaOrError.value
    const personaCreated = await this.personaRepository.create(persona)
    return personaCreated
  }
}
