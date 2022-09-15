import { PersonaModel } from '../models/persona'
import InputPersonaData from '../protocols/persona-protocols'

export interface AddPersona {
  add: (insert: InputPersonaData) => Promise<PersonaModel>
}
