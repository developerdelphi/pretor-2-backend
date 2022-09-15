import InputPersonaData from '../protocols/persona-protocols'
import Address from './address'
import Name from './name'
export class Persona {
  name: Name
  kind: string
  address: Address[] = []

  constructor (input: InputPersonaData) {
    this.name = new Name(input.name)
    this.kind = input.kind
  }

  addAddress (address: Address): void {
    this.address.push(address)
  }
}
