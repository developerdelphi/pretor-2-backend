export class InvalidNumberAddressError extends Error {
  constructor (value: string) {
    super(`O valor de número informado como ${value} é inválido`)
    this.name = 'InvalidNumberAddressError'
  }
}
