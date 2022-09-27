import { Persona } from '@/domain/entity/persona'
import { InvalidNamePersonaError } from '@/domain/error'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'
import { Either, right } from '@/shared/either'

export default class PersonaRepositoryDatabase implements PersonaRepository {
  constructor (readonly connection: Connection) {}

  async create (persona: Persona): Promise<Either<InvalidNamePersonaError, Persona>> {
    // const [personaData] =
    await this.connection.query('insert into persona (name, kind) values ($1, $2) returning *', [persona.getName(), persona.kind])
    // const persona: PersonaModel = {
    //   persona_id: personaData.persona_id,
    //   name: personaData.name,
    //   kind: personaData.kind,
    //   address: personaData.address
    // }
    return right(persona)
  }
}
