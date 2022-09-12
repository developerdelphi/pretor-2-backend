interface PersonaInputData {
  name: string
}

interface PersonaContract {
  name: string
}
class Persona {
  private _name: string = ''

  get name (): string {
    return this._name
  }

  set name (value: string) {
    const validateName = value.trim()
    if (validateName.length > 0) { this._name = validateName }
  }
}

export { Persona, PersonaContract, PersonaInputData }
