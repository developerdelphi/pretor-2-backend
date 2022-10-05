import axios from 'axios'

describe('API Express', () => {
  test('Deve testar a API', async () => {
    const response = await axios({
      url: 'http://localhost:3000/persona',
      method: 'POST',
      data: {
        name: 'Pedro Augusto da Silva',
        kind: 'F',
        address: [
          {
            street: 'Rua vai e vem',
            number: '123',
            complement: 'Qd. 1 Lt. 2',
            district: 'centro',
            city: 'Anápolis',
            uf: 'GO',
            cep: '75110-100',
            status: 'active'
          }
        ],
        phone: [{
          number: '(62)9999-8787',
          status: 'active'
        }]
      }
    })
    console.log(response.data)
    expect(response.status).toBe(200)
  })
})
