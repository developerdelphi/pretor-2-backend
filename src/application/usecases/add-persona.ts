import { Persona } from '@/domain/entity/persona'
import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { PersonaModel } from '@/domain/models/persona'
import { AddressOrError, InputPersonaData } from '@/domain/protocols'
import { left } from '@/shared/either'
import { AddPersonaResponse } from '../protocols/add-persona-response'
import { Address } from '@/domain/entity'

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
    if (insert.address) {
      for (const addressToInput of insert.address) {
        const addressCreated: AddressOrError = Address.create(addressToInput)
        if (addressCreated.isLeft()) {
          return left(addressCreated.value)
        }
        persona.addAddress(addressCreated.value)
      }
    }
    const personaCreated = await this.personaRepository.create(persona)
    return personaCreated
  }
}
