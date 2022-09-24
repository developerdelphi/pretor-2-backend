import { Persona } from '@/domain/entity/persona'
import { PersonaModel } from '@/domain/models/persona'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'

export default class PersonaRepositoryDatabase implements PersonaRepository {
  constructor (readonly connection: Connection) {}

  async create (persona: Persona): Promise<PersonaModel> {
    const [personaData] = await this.connection.query('insert into persona (name, kind) values ($1, $2) returning *', [persona.name, persona.kind])
    const personaModel: PersonaModel = {
      persona_id: personaData.persona_id,
      name: personaData.name,
      kind: personaData.kind,
      address: personaData.address
    }
    return personaModel
  }
}
