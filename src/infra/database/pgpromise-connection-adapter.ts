import { Connection } from './connection'
import pgp from 'pg-promise'

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any
  static instance: PgPromiseConnectionAdapter

  private constructor(config: string) {
    const strConnection = config ?? 'postgresql://pretor:123@db-pretor:5434/pretor'
    this.pgp = pgp()(strConnection)
  }

  static getInstance (config: string = ''): PgPromiseConnectionAdapter {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter(config)
    }
    return PgPromiseConnectionAdapter.instance
  }

  async query (statement: string, params: any[]): Promise<any> {
    return await this.pgp.query(statement, params)
  }

  async one (statement: string, params: any[]): Promise<any> {
    return this.pgp.one(statement, params)
  }

  async close (): Promise<void> {
    return await this.pgp.$pool.end()
  }
}
