import { PersonaModel } from '../models/persona'

export interface AddPersonaModel {
  name: string
}

export interface AddPersona {
  add: (insert: AddPersonaModel) => Promise<PersonaModel>
}
