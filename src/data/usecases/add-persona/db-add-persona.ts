import { PersonaModel } from '@/domain/models/persona'
import { InputPersonaData } from '@/domain/protocols'
import { AddPersona } from '@/application/usecases/add-persona'

export class DbAddPersona implements AddPersona {
  async add (insert: InputPersonaData): Promise<PersonaModel> {
    return await new Promise(resolve => resolve({
      id: 'valid_id',
      name: insert.name,
      kind: insert.kind
    }))
  }
}
