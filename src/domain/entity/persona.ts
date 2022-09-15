import InputPersonaData from '../protocols/persona-protocols'
import Address from './address'
import Name from './name'
import Phone from './phone'
export class Persona {
  name: Name
  kind: string
  address: Address[] = []
  phone: Phone[] = []

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
}
