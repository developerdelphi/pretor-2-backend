import InputPersonaData from '../protocols/persona-protocols'
import Address from './address'
import Document from './document'
import Name from './name'
import Phone from './phone'
export class Persona {
  name: Name
  kind: string
  address: Address[] = []
  phone: Phone[] = []
  document: Document[] = []

  constructor (input: InputPersonaData) {
    this.name = new Name(input.name)
    this.kind = input.kind
  }

  addAddress (address: Address): void {
    this.address.push(address)
  }

  addPhone (phone: Phone): void {
    this.phone.push(phone)
  }

  addDocument (document: Document): void {
    this.document.push(document)
  }
}
