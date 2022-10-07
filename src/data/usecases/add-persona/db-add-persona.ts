import { PersonaModel } from '@/domain/models/persona'
import { InputPersonaData } from '@/domain/protocols'
import { IAddPersona } from '@/application/protocols'

export class DbAddPersona implements IAddPersona {
  async add (insert: InputPersonaData): Promise<PersonaModel> {
    return await new Promise(resolve => resolve({
      persona_id: 'valid_id',
      name: insert.name,
      kind: insert.kind
    }))
  }
}
