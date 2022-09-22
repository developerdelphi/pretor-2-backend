import { AddPersona } from '@/application/usecases/add-persona'
import { InputPersonaData } from '@/domain/protocols'
import PersonaRepositoryMemory from '@/infra/repository/memory/persona-repository-memory'

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
    expect(newPersona).toEqual({ id: 'valid_id', name: input.name, kind: input.kind })
  })
})
