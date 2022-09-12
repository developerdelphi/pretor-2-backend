export class MissingParamError extends Error {
  constructor (msg: string = 'valor inválido') {
    super(msg)
    this.name = 'MissingParamError'
  }
}
