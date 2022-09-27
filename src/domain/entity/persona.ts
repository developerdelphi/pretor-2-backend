import { IAddress, InputPersonaData } from '../protocols'
import { Document, Phone } from '@/domain/entity'
import { Name } from '@/domain/value-object'
import { Either, left, right } from '@/shared/either'
import { InvalidNamePersonaError } from '../error'

export class Persona {
  address: IAddress[]
  phone: Phone[] = []
  document: Document[] = []
  private readonly name: Name
  kind: string

  private constructor (private readonly pessoaId: string, name: Name, kind: string) {
    this.name = name
    this.kind = kind
    this.address = []
  }

  static create (persona: InputPersonaData): Either<InvalidNamePersonaError, Persona> {
    const nameOrError: Either<InvalidNamePersonaError, Name> = Name.create(persona.name)
    if (nameOrError.isLeft()) return left(new InvalidNamePersonaError(persona.name))
    const name: Name = nameOrError.value
    return right(new Persona('0', name, persona.kind))
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
}
