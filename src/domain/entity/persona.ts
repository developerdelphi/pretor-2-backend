import Name from './name'

export interface PersonaInputData {
  name: string
}

export interface PersonaContract {
  name: string
}
export class Persona {
  name: Name
  kind: string
  constructor (name: string, kind: string = 'F') {
    this.name = new Name(name)
    this.kind = kind
  }
}
