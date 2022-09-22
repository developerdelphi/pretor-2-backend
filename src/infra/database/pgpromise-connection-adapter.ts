import { Connection } from './connection'
import pgp from 'pg-promise'

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any

  constructor () {
    this.pgp = pgp()('postgres://postgres:docker@localhost:5432/pretor')
  }

  async query (statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params)
  }
}
