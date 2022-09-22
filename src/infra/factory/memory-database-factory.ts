import RepositoryFactory from '@/domain/factory/repository-factory'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import PersonaRepositoryMemory from '../repository/memory/persona-repository-memory'

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createPersonaRepository (): PersonaRepository {
    return new PersonaRepositoryMemory()
  }
}
