export class InvalidQualityError extends Error {
  constructor (value: string) {
    super(`A qualificação informada como ${value} é inválida`)
    this.name = 'InvalidQualityError'
  }
}
