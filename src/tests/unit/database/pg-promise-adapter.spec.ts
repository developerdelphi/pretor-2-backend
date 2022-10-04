import PgPromiseConnectionAdapter from "@/infra/database/pgpromise-connection-adapter"

describe('PgPromise Adapter', () => {
  test('Deve estabelecer uma conexão', async () => {
    const configConnection = 'postgresql://pretor:123@localhost:5434/pretor'
    const sut = PgPromiseConnectionAdapter.getInstance(configConnection)
    const result = await sut.query('select true', [])
    expect(result).toBeTruthy()
  })
})
