import { PersonaModel } from '../../domain/models/persona'
import { InputPersonaData } from '../../domain/protocols'

export interface IAddPersona {
  add: (insert: InputPersonaData) => Promise<PersonaModel>
}

export class AddPersona {
  async add (insert: InputPersonaData): Promise<PersonaModel> {
    return {
      id: 'id',
      name: 'name',
      kind: 'kind'
    }
  }
}
