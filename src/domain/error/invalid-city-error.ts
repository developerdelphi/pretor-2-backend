export class InvalidCityError extends Error {
  constructor (value: string) {
    super(`A cidade informa como ${value} é inválido`)
    this.name = 'InvalidCityError'
  }
}
