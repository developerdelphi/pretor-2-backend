import { PersonaRepository } from '@/application/protocols/persona-repository'
import { InputPersonaData } from '@/domain/protocols'

export class PersonaRepositoryPostGres implements PersonaRepository {
  async create (data: InputPersonaData): Promise<void> {
    return await new Promise(resolve => (resolve()))
  }
}
