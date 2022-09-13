interface PersonaInputData {
  name: string
}

interface PersonaContract {
  name: string
}
class Persona {
  private _name: string = ''
  constructor (name?: string) {
    if (name) this.name = name
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    if (value && value.length <= 5) {
      throw (new Error('Invalid name'))
    }
    this._name = value
  }
}

export { Persona, PersonaContract, PersonaInputData }
