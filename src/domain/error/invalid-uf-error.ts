export class InvalidUfError extends Error {
  constructor (value: string) {
    super(`A UF informada como ${value} é inválida`)
    this.name = 'InvalidUfError'
  }
}
