import { RepositoryFactory } from '@/domain/factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import PersonaRepositoryDatabase from '@/infra/repository/database/persona-repository-database'
import PgPromiseConnectionAdapter from '../database/pgpromise-connection-adapter'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  createPersonaRepository (): PersonaRepository {
    const config = 'postgresql://pretor:123@db-pretor/pretor'
    return new PersonaRepositoryDatabase(PgPromiseConnectionAdapter.getInstance(config))
  }
}
