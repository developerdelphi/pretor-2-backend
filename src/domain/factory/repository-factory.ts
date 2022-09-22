import { PersonaRepository } from '../repository/persona-repository'

export default interface RepositoryFactory {
  createPersonaRepository: () => PersonaRepository
}
