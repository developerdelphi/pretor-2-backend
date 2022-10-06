import { PersonaRepository } from '../repository/persona-repository'

export interface RepositoryFactory {
  createPersonaRepository: () => PersonaRepository
}
