import { Connection } from '@/infra/database/connection'
import pgPromise from 'pg-promise'

const makeSut = (): Connection => {
  class ConnectionStub implements Connection {
    pgp: any
    constructor () {
      this.pgp = pgPromise()('postgresql://pretor:123@localhost:5434/pretor')
      // this.pgp = pgPromise()({
      //   host: 'localhost',
      //   database: 'pretor',
      //   port: 5434,
      //   user: 'pretor',
      //   password: '123'
      // })
    }

    async query (statement: string, params: any[]): Promise<any> {
      const queryResult = await this.pgp.query(statement, params)
      return queryResult
    }

    async one (statement: string, params: any[]): Promise<any> {}
    async close (): Promise<void> {
      this.pgp.end()
    }
  }

  return new ConnectionStub()
}

describe('Conexão com Banco de Dados', () => {
  test('Deve criar uma conexão com o banco de dados', async () => {
    const sut = makeSut()
    const resp = await sut.query('select true', [])
    expect(resp).toBeTruthy()
  })
})
