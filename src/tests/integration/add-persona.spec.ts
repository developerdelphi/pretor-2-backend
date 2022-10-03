import { AddPersona } from '@/application/usecases/add-persona'
import { InvalidCpfError, InvalidKindError, InvalidNamePersonaError, InvalidNumberPhoneError, InvalidStreetError } from '@/domain/error'
import { InputPersonaData } from '@/domain/protocols'
import { PersonaRepository } from '@/domain/repository/persona-repository'
import { Connection } from '@/infra/database/connection'
import PgPromiseConnectionAdapter from '@/infra/database/pgpromise-connection-adapter'
import DatabaseRepositoryFactory from '@/infra/factory/database-repository-factory'
import PersonaRepositoryDatabase from '@/infra/repository/database/persona-repository-database'

const input: InputPersonaData = {
  name: 'Valid Name',
  kind: 'F',
  document: [{
    kind: 'cpf',
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
interface SutType {
  addPersona: AddPersona
  personaRepository: PersonaRepository
  connection: Connection
}
const makeSut = (): SutType => {
  const connection = PgPromiseConnectionAdapter.getInstance()
  const personaRepository = new PersonaRepositoryDatabase(connection)
  const repositoryFactory = new DatabaseRepositoryFactory()
  const addPersona = new AddPersona(repositoryFactory)

  return { addPersona, personaRepository, connection }
}

describe('Registrar uma Pessoa - UseCase', () => {
  test('Deve registrar uma pessoa no sistema', async () => {
    const { addPersona, connection } = makeSut()
    const inputFake: InputPersonaData = {
      name: 'Valid Name',
      kind: 'F',
      address: [{
        street: 'Rua valid',
        number: '123',
        complement: 'Qd. 01, Lt. 02, Casa 03',
        district: 'Centro',
        cep: '75000-000',
        city: 'Anápolis',
        uf: 'GO'
      }],
      phone: [{
        number: '(99)99999-9999',
        status: 'active'
      }],
      document: [{
        kind: 'RG',
        identifier: '123456/SSP-GO',
        status: 'active'
      }]
    }
    const newPersona = await addPersona.execute(inputFake)
    expect(newPersona.isRight()).toBeTruthy()
    await connection.close()
  })

  test('Deve retornar InvalidNamePersonaError ao tentar registrar uma pessoa com nome inválido', async () => {
    const { addPersona } = makeSut()
    const inputFake = { ...input, name: '' }
    const newPersona = await addPersona.execute(inputFake)
    expect(newPersona.value).toBeInstanceOf(InvalidNamePersonaError)
  })

  test('Deve retornar InvalidKindError ao tentar registrar uma pessoa com nome inválido', async () => {
    const { addPersona } = makeSut()
    const inputFake = { ...input, kind: '--' }
    const newPersona = await addPersona.execute(inputFake)
    expect(newPersona.value).toBeInstanceOf(InvalidKindError)
  })

  test('Deve retornar InvalidStreetError ao tentar registrar uma pessoa com endereço inválido', async () => {
    const { addPersona } = makeSut()
    const inputFake: InputPersonaData = {
      name: 'Valid Name',
      kind: 'F',
      address: [{
        street: '----',
        number: '123',
        complement: 'Qd. 01, Lt. 02, Casa 03',
        district: 'Centro',
        cep: '75000-000',
        city: 'Anápolis',
        uf: 'GO'
      }]
    }
    const newPersona = await addPersona.execute(inputFake)
    expect(newPersona.value).toBeInstanceOf(InvalidStreetError)
  })

  test('Deve retornar InvalidNumberPhoneError ao tentar registrar uma pessoa com telefone inválido', async () => {
    const { addPersona } = makeSut()
    const inputFake: InputPersonaData = {
      name: 'Valid Name',
      kind: 'F',
      phone: [{
        number: '999999-9999',
        status: 'active'
      }]
    }
    const newPersona = await addPersona.execute(inputFake)
    expect(newPersona.value).toBeInstanceOf(InvalidNumberPhoneError)
  })

  test('Deve retornar InvalidDocumentError ao tentar registrar uma pessoa com documento inválido', async () => {
    const { addPersona } = makeSut()
    const inputFake: InputPersonaData = {
      name: 'Valid Name',
      kind: 'F',
      document: [{
        kind: 'CPF',
        identifier: 'invalid-cpf',
        status: 'active'
      }]
    }
    const newPersona = await addPersona.execute(inputFake)
    expect(newPersona.value).toBeInstanceOf(InvalidCpfError)
  })
})
