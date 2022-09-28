export class InvalidNumberPhoneError extends Error {
  constructor (value: string) {
    super(`O número de telefone informado como ${value} é inválido`)
    this.name = 'InvalidNumberPhoneError'
  }
}
