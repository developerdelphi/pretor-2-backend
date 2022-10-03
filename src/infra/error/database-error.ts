export class DatabaseError extends Error {
  constructor (value: string) {
    super(`Ocorreu erro no banco de dados: ${value}`)
    this.name = 'DatabaseError'
  }
}
