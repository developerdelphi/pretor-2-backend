export class InvalidNamePersonaError extends Error {
  constructor (value: string) {
    super(`O nome informado como ${value} é inválido`)
    this.name = 'InvalidNamePersonaError'
  }
}
