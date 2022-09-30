export class InvalidComplementAddressError extends Error {
  constructor (value: string) {
    super(`O complemento informado como ${value} é inválido`)
    this.name = 'InvalidComplementAddressError'
  }
}
