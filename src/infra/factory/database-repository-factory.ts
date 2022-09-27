import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import PgPromiseConnectionAdapter from '@/infra/database/pgpromise-connection-adapter'
import PersonaRepositoryDatabase from '@/infra/repository/database/persona-repository-database'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  createPersonaRepository (): PersonaRepository {
    return new PersonaRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }
}
