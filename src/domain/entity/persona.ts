import Name from './name'

export interface PersonaInputData {
  name: string
}

export interface PersonaContract {
  name: string
}
export class Persona {
  name: Name
  constructor (name: string) {
    this.name = new Name(name)
  }
}
