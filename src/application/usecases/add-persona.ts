import { PersonaModel } from '../../domain/models/persona'
import { InputPersonaData } from '../../domain/protocols'

export interface AddPersona {
  add: (insert: InputPersonaData) => Promise<PersonaModel>
}
