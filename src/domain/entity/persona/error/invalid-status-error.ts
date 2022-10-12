export class InvalidStatusError extends Error {
  constructor (value: string) {
    super(`O valor de status informado como ${value} é inválido`)
  }
}
