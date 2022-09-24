import { AddPersona } from '@/application/usecases/add-persona'
import { InputPersonaData } from '@/domain/protocols'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'
import PgPromiseConnectionAdapter from '@/infra/database/pgpromise-connection-adapter'
import DatabaseRepositoyFactory from '@/infra/factory/database-repository-factory'
import MemoryRepositoryFactory from '@/infra/factory/memory-database-factory'
import PersonaRepositoryDatabase from '@/infra/repository/database/persona-repository-database'

interface SutReturn {
  addPersona: AddPersona
  personaRepository: PersonaRepository
  connection: Connection
}
const makeSut = (): SutReturn => {
  const connection = PgPromiseConnectionAdapter.getInstance()
  const personaRepository = new PersonaRepositoryDatabase(connection)
  const repositoryFactory = new DatabaseRepositoyFactory()
  const addPersona = new AddPersona(repositoryFactory)

  return { addPersona, personaRepository, connection }
}
describe('Registrar uma Pessoa - UseCase', () => {
  test('Deve registrar uma pessoa no sistema em memória', async () => {
    const repositoryFactory = new MemoryRepositoryFactory()
    const addPersona = new AddPersona(repositoryFactory)
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
    const { addPersona } = makeSut()
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

  // test('Deve registrar uma pessoa com um endereço', async () => {
  //   const { addPersona } = makeSut()
  //   const input: InputPersonaData = {
  //     name: 'Valid Name',
  //     kind: 'F',
  //     address: [{
  //       street: 'Rua Principal',
  //       number: '123',
  //       complement: 'Qd. 01, Lt. 02, Casa 03',
  //       district: 'Centro',
  //       cep: '75000-000',
  //       city: 'Anápolis',
  //       uf: 'GO'
  //     }]

  //   }
  //   const newPersona = await addPersona.execute(input)
  //   expect(newPersona.address).toEqual(input.address)
  // })
})
