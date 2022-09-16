import Address from './address'
import Document from './document'
import Name from './name'
import Phone from './phone'

export class Persona {
  address: Address[] = []
  phone: Phone[] = []
  document: Document[] = []
  name: string
  kind: string

  constructor (name: string, kind: string) {
    this.name = new Name(name).value
    this.kind = kind
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
