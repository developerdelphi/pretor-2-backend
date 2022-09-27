import { IAddress, InputPersonaData, PersonaOrError } from '../protocols'
import { Document, Phone } from '@/domain/entity'
import { Name, Kind } from '@/domain/value-object'
import { Either, left, right } from '@/shared/either'
import { InvalidKindError, InvalidNamePersonaError } from '../error'

export class Persona {
  address: IAddress[]
  phone: Phone[] = []
  document: Document[] = []

  private constructor (private personaId: string, private readonly name: Name, private readonly kind: Kind) {
    this.address = []
  }

  static create (persona: InputPersonaData): PersonaOrError {
    const nameOrError: Either<InvalidNamePersonaError, Name> = Name.create(persona.name)
    const kindOrError: Either<InvalidKindError, Kind> = Kind.create(persona.kind)
    if (nameOrError.isLeft()) return left(new InvalidNamePersonaError(persona.name))
    if (kindOrError.isLeft()) return left(new InvalidKindError(persona.kind))
    const name: Name = nameOrError.value
    const kind: Kind = kindOrError.value
    return right(new Persona('0', name, kind))
  }

  addAddress (address: IAddress): void {
    this.address.push(address)
  }

  addPhone (phone: Phone): void {
    this.phone.push(phone)
  }

  addDocument (document: Document): void {
    this.document.push(document)
  }

  getName (): string {
    return this.name.value
  }

  getKind (): string {
    return this.kind.value
  }

  setPersonaId (id: string): void {
    this.personaId = id
  }
}
