import { Persona } from '@/domain/entity/persona'
import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { PersonaModel } from '@/domain/models/persona'
import { AddressOrError, InputPersonaData } from '@/domain/protocols'
import { left } from '@/shared/either'
import { AddPersonaResponse } from '../protocols/add-persona-response'
import { Address, Document, Phone } from '@/domain/entity'
import { Qualification } from '@/domain/entity/qualification'

export interface IAddPersona {
  add: (input: InputPersonaData) => Promise<PersonaModel>
}

export class AddPersona {
  personaRepository: PersonaRepository
  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.personaRepository = repositoryFactory.createPersonaRepository()
  }

  async execute (input: InputPersonaData): Promise<AddPersonaResponse> {
    const personaOrError = Persona.create({ name: input.name, kind: input.kind })
    if (personaOrError.isLeft()) return left(personaOrError.value)
    const persona: Persona = personaOrError.value

    if (input.address) {
      for (const addressToInput of input.address) {
        const addressOrError: AddressOrError = Address.create(addressToInput)
        if (addressOrError.isLeft()) {
          return left(addressOrError.value)
        }
        persona.addAddress(addressOrError.value)
      }
    }

    if (input.phone) {
      for (const phoneInput of input.phone) {
        const phoneOrError = Phone.create(phoneInput)
        if (phoneOrError.isLeft()) {
          return left(phoneOrError.value)
        }
        persona.addPhone(phoneOrError.value)
      }
    }

    if (input.document) {
      for (const documentInput of input.document) {
        const documentOrError = Document.create(documentInput)
        if (documentOrError.isLeft()) {
          return left(documentOrError.value)
        }
        persona.addDocument(documentOrError.value)
      }
    }

    if (input.qualification) {
      for (const qualification of input.qualification) {
        const qualificationOrError = Qualification.create(qualification)
        if (qualificationOrError.isLeft()) { return left(qualificationOrError.value) }
        persona.addQualification(qualificationOrError.value)
      }
    }

    const newPersona = await this.personaRepository.create(persona)
    return newPersona
  }
}
