export class ServerError extends Error {
  constructor () {
    super('Unexpected internal server error')
    this.name = 'ServerError'
  }
}
