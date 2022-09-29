import { Persona } from '@/domain/entity/persona'
import { InvalidNamePersonaError } from '@/domain/error'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'
import { Either, right } from '@/shared/either'

export default class PersonaRepositoryDatabase implements PersonaRepository {
  constructor (readonly connection: Connection) {}

  async create (persona: Persona): Promise<Either<InvalidNamePersonaError, Persona>> {
    await this.connection.query('insert into persona (name, kind) values ($1, $2) returning *', [persona.name, persona.kind])
    return right(persona)
  }
}
