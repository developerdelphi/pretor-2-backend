import { IAddress } from '../protocols'
// import Address from './address'
import Document from './document'
import Name from './name'
import Phone from './phone'

export class Persona {
  address: IAddress[]
  phone: Phone[] = []
  document: Document[] = []
  name: string
  kind: string

  constructor (private readonly pessoa_id: string, name: string, kind: string) {
    this.name = new Name(name).value
    this.kind = kind
    this.address = []
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
}
