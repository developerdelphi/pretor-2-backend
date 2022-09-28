import { Persona } from '@/domain/entity/persona'
import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { PersonaModel } from '@/domain/models/persona'
import { AddressOrError, InputPersonaData } from '@/domain/protocols'
import { left } from '@/shared/either'
import { AddPersonaResponse } from '../protocols/add-persona-response'
import { Address, Phone } from '@/domain/entity'

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
        const addressOrError: AddressOrError = Address.create(addressToInput)
        if (addressOrError.isLeft()) {
          return left(addressOrError.value)
        }
        persona.addAddress(addressOrError.value)
      }
    }

    if (insert.phone) {
      for (const phoneInput of insert.phone) {
        const phoneOrError = Phone.create(phoneInput)
        if (phoneOrError.isLeft()) {
          return left(phoneOrError.value)
        }
        persona.addPhone(phoneOrError.value)
      }
    }

    const personaCreated = await this.personaRepository.create(persona)
    return personaCreated
  }
}
