import { PersonaModel } from '@/domain/models/persona'
import { AddPersona, AddPersonaModel } from '@/domain/usecases/add-persona'

export class DbAddPersona implements AddPersona {
  async add (insert: AddPersonaModel): Promise<PersonaModel> {
    return await new Promise(resolve => resolve({
      id: 'valid_id',
      name: insert.name
    }))
  }
}
