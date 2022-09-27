import { IAddress, InputPersonaData } from '../protocols'
import { Document, Phone } from '@/domain/entity'
import { Name, Kind } from '@/domain/value-object'
import { Either, left, right } from '@/shared/either'
import { InvalidKindError, InvalidNamePersonaError } from '../error'

export class Persona {
  address: IAddress[]
  phone: Phone[] = []
  document: Document[] = []
  private readonly name: Name
  private readonly kind: Kind

  private constructor (private readonly pessoaId: string, name: Name, kind: Kind) {
    this.name = name
    this.kind = kind
    this.address = []
  }

  static create (persona: InputPersonaData): Either<InvalidNamePersonaError | InvalidKindError, Persona> {
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
}
