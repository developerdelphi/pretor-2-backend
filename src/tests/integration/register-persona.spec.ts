import { AddPersona } from '@/application/usecases/add-persona'
import { InputPersonaData } from '@/domain/protocols'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'
import PgPromiseConnectionAdapter from '@/infra/database/pgpromise-connection-adapter'
import PersonaRepositoryDatabase from '@/infra/repository/database/persona-repository-database'
import PersonaRepositoryMemory from '@/infra/repository/memory/persona-repository-memory'

interface SutReturn {
  addPersona: AddPersona
  personaRepository: PersonaRepository
  connection: Connection
}
const makesut = (): SutReturn => {
  const connection = new PgPromiseConnectionAdapter()
  const personaRepository = new PersonaRepositoryDatabase(connection)
  const addPersona = new AddPersona(personaRepository)

  return { addPersona, personaRepository, connection }
}
describe('Registrar uma Pessoa - UseCase', () => {
  test('Deve registrar uma pessoa no sistema em memória', async () => {
    const personaRepository = new PersonaRepositoryMemory()
    const addPersona = new AddPersona(personaRepository)
    const input: InputPersonaData = {
      name: 'Valid Name',
      kind: 'F',
      document: [{
        type: 'cpf',
        identifier: '111.111.111-11',
        status: 'active'
      }],
      address: [{
        street: 'Rua Principal',
        number: '123',
        complement: 'Qd. 01, Lt. 02, Casa 03',
        district: 'Centro',
        cep: '75000-000',
        city: 'Anápolis',
        uf: 'GO'
      }],
      phone: [{
        number: '(62) 99999-8877',
        status: 'active'
      }]

    }
    const newPersona = await addPersona.execute(input)
    expect(newPersona).toEqual({ persona_id: 'valid_id', name: input.name, kind: input.kind })
  })

  test('Deve registrar uma pessoa no sistema em database', async () => {
    const { addPersona } = makesut()
    const input: InputPersonaData = {
      name: 'Valid Name',
      kind: 'F',
      document: [{
        type: 'cpf',
        identifier: '111.111.111-11',
        status: 'active'
      }],
      address: [{
        street: 'Rua Principal',
        number: '123',
        complement: 'Qd. 01, Lt. 02, Casa 03',
        district: 'Centro',
        cep: '75000-000',
        city: 'Anápolis',
        uf: 'GO'
      }],
      phone: [{
        number: '(62) 99999-8877',
        status: 'active'
      }]

    }
    const newPersona = await addPersona.execute(input)
    expect(newPersona).toHaveProperty('persona_id')
    expect(newPersona.persona_id).toBeGreaterThan(0)
  })
})
