interface PersonaInputData {
  name: string
}

interface PersonaContract {
  name: string
}
class Persona {
  private _name: string = ''
  constructor (name?: string) {
    if (name) this._name = name
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    const validateName: string = value.trim()
    if (validateName.length <= 5) {
      throw (new Error('Nome invalido'))
    }
    this._name = validateName
  }
}

export { Persona, PersonaContract, PersonaInputData }
