export class InvalidKindError extends Error {
  constructor (value: string) {
    super(`O valor do Tipo de Pessoa informado como ${value} é inválido`)
    this.name = 'InvalidKindError'
  }
}
