export default class InvalidParamError extends Error {
  constructor (fieldName: string, msg: string = 'valor inválido') {
    super(`${fieldName}: ${msg}`)
    this.name = 'InvalidParamError'
  }
}
