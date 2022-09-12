import { AddPersonaController } from '@/presentation/controllers/persona/add-persona'
describe('AddPersona Controller', () => {
  test('Deve retornar 40 recebeu dados válidos para parâmetro nome', () => {
    const sut = new AddPersonaController()
    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
