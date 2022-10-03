import { Connection } from './connection'
import pgp from 'pg-promise'

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any
  static instance: PgPromiseConnectionAdapter

  private constructor () {
    this.pgp = pgp()('postgres://pretor:123@0.0.0.0:5434/pretor')
  }

  static getInstance (): PgPromiseConnectionAdapter {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter()
    }
    return PgPromiseConnectionAdapter.instance
  }

  async query (statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params)
  }

  async one (statement: string, params: any[]): Promise<any> {
    return this.pgp.one(statement, params)
  }

  async close (): Promise<void> {
    return this.pgp.$pool.end()
  }
}
