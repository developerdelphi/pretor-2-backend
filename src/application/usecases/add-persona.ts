import { Persona } from '@/domain/entity/persona/persona'
import { RepositoryFactory } from '@/domain/factory'
import { PersonaRepository } from '@/domain/repository'
import { AddressOrError, InputPersonaData } from '@/domain/protocols'
import { Either, left } from '@/shared/either'
import { AddPersonaResponse } from '../protocols/add-persona'
import { Address, Document, Phone } from '@/domain/entity/persona'
import { Qualification } from '@/domain/entity/persona/qualification'

export class AddPersona {
  personaRepository: PersonaRepository
  constructor (readonly repositoryFactory: RepositoryFactory) {
    this.personaRepository = repositoryFactory.createPersonaRepository()
  }

  async execute (input: InputPersonaData): Promise<AddPersonaResponse> {
    const personaOrError: Either<Error, Persona> = Persona.create({ name: input.name, kind: input.kind })
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
