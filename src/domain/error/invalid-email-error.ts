export default class InvalidEmailError extends Error {
  constructor (email: string) {
    super(`O endereço de informado como ${email} é inválido`)
    this.name = 'InvalidEmailError'
  }
}
