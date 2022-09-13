import InputPersonaData from '../protocols/persona-protocols'
import Name from './name'
export class Persona {
  name: Name
  kind: string
  constructor (input: InputPersonaData) {
    this.name = new Name(input.name)
    this.kind = input.kind
  }
}
