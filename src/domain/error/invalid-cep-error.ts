export class InvalidCepError extends Error {
  constructor (value: string) {
    super(`O CEP informado como ${value} é inválido`)
    this.name = 'InvalidCepError'
  }
}
