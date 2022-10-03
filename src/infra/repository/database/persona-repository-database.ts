import { Persona } from '@/domain/entity/persona'
import { InvalidNamePersonaError } from '@/domain/error'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'
import { Either, right } from '@/shared/either'

export default class PersonaRepositoryDatabase implements PersonaRepository {
  constructor (readonly connection: Connection) {}

  async create (persona: Persona): Promise<Either<InvalidNamePersonaError, Persona>> {
    const [personaData] = await this.connection.query('insert into persona (name, kind) values ($1, $2) returning *', [persona.name, persona.kind])

    const personaId = personaData.persona_id
    persona.personaId = personaId

    if (persona.address.length) {
      for (const address of persona.address) {
        await this.connection.query('insert into address (persona_id, street, number, complement, district, cep, city, uf, status, obs) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [personaId, address.street, address.number, address.complement, address.district, address.cep, address.city, address.uf, 'active', ''])
      }
    }

    if (persona.phone.length) {
      for (const phone of persona.phone) {
        await this.connection.query('insert into phone (persona_id, number, status) values ($1, $2, $3)', [personaId, phone.number.value, phone.status])
      }
    }

    if (persona.document.length) {
      for (const document of persona.document) {
        await this.connection.query('insert into document (persona_id, kind, identifier, status) values ($1, $2, $3, $4)', [personaId, document.kind, document.identifier, document.status])
      }
    }

    return right(persona)
  }
}
