export class InvalidStreetError extends Error {
  constructor (value: string) {
    super(`O endereço informado como ${value} é inválido`)
    this.name = 'InvalidStreetError'
  }
}
