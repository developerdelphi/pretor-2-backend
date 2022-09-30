export class InvalidCpfError extends Error {
  constructor (value: string) {
    super(`O CPF ${value} é inválido`)
    this.name = 'InvalidCpfError'
  }
}
