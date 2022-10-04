import axios from 'axios'

describe('API Express', () => {
  test.skip('Deve testar a API', async () => {
    const response = await axios({
      url: 'http://localhost:3000/persona',
      method: 'POST',
      data: {
        name: 'Pedro Augusto da Silva',
        kind: 'F'
      }
    })
    console.log(response.data)
    expect(response.status).toBe(200)
  })
})
