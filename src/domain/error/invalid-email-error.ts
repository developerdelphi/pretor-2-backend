export default class InvalidEmailError extends Error {
  constructor (email: string) {
    super(`O e-mail "${email}" é inválido`)
    this.name = 'InvalidEmailError'
  }
}
