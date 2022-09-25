export class InvalidDistrictError extends Error {
  constructor (value: string) {
    super(`O bairro informado como ${value} é inválido`)
    this.name = 'InvalidDistrictError'
  }
}
