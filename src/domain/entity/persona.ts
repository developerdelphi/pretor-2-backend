import Name from './name'
export class Persona {
  name: Name
  kind: string
  constructor (name: string, kind: string = 'F') {
    this.name = new Name(name)
    this.kind = kind
  }
}
