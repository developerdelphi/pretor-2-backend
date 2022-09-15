import { PersonaModel } from '@/domain/models/persona'
import InputPersonaData from '@/domain/protocols/persona-protocols'
import { AddPersona } from '@/domain/usecases/add-persona'

export class DbAddPersona implements AddPersona {
  async add (insert: InputPersonaData): Promise<PersonaModel> {
    return await new Promise(resolve => resolve({
      id: 'valid_id',
      name: insert.name,
      kind: insert.kind
    }))
  }
}
