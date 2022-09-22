import PgPromiseConnectionAdapter from '@/infra/database/pgpromise-connection-adapter'

describe('Conexão com Banco de Dados', () => {
  test('Deve criar uma conexão com o banco de dados', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    const resp = await connection.query('select true', [])
    expect(resp).toBeTruthy()
  })
})
