import { IAddress, IDocument, InputPersonaData, IPhone, IQualification, PersonaOrError } from '@/domain/protocols'
import { Name, Kind } from '@/domain/value-object'
import { Either, left, right } from '@/shared/either'
import { InvalidKindError, InvalidNamePersonaError } from '@/domain/entity/persona/error'

export class Persona {
  protected _id: string
  protected _name: string
  protected _kind: string
  private readonly _address: IAddress[]
  private readonly _phone: IPhone[]
  private readonly _document: IDocument[]
  private readonly _qualification: IQualification[]

  private constructor (personaId: string, name: Name, kind: Kind) {
    this._id = personaId
    this._name = name.value
    this._kind = kind.value
    this._address = []
    this._phone = []
    this._document = []
    this._qualification = []
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
    this._address.push(address)
  }

  addPhone (phone: IPhone): void {
    this._phone.push(phone)
  }

  addDocument (document: IDocument): void {
    this._document.push(document)
  }

  addQualification (qualification: IQualification): void {
    this._qualification.push(qualification)
  }

  get qualification (): IQualification[] {
    return this._qualification
  }

  get document (): IDocument[] {
    return this._document
  }

  get address (): IAddress[] {
    return this._address
  }

  get phone (): IPhone[] {
    return this._phone
  }

  get personaId (): string {
    return this._id
  }

  set personaId (id: string) {
    this._id = id
  }

  get name (): string {
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  get kind (): string {
    return this._kind
  }

  set kind (kind: string) {
    this._kind = kind
  }
}
