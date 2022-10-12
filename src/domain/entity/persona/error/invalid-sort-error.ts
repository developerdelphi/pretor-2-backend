export class InvalidSortError extends Error {
  constructor (value: string) {
    super(`O tipo informado como ${value} é inválido`)
    this.name = 'InvalidSortError'
  }
}
