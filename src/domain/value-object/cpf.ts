import { Either, left, right } from '@/shared/either'
import { InvalidCpfError } from '../error'

export class Cpf {
  private readonly cpf: string
  private constructor (cpf: string) {
    this.cpf = cpf
  }

  static create (cpf: string): Either<InvalidCpfError, Cpf> {
    cpf = cpf.trim()
    if (!Cpf.isValid(cpf)) return left(new InvalidCpfError(cpf))
    return right(new Cpf(cpf))
  }

  static isValid (cpf: string): boolean {
    if (!cpf) return false
    if (!cpf.match('^\\d{3}.\\d{3}.\\d{3}-\\d{2}$')) return false
    cpf = cpf.replace(/[\\.\-\D]*/g, '')
    if (!cpf.match('^\\d{11}$')) return false
    if (cpf.split('').every(c => c === cpf[0])) return false

    let d1 = 0
    let d2 = 0
    for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
      const digito = parseInt(cpf.substring(nCount - 1, nCount))
      d1 = d1 + (11 - nCount) * digito
      d2 = d2 + (12 - nCount) * digito
    }
    let rest = 0
    rest = (d1 % 11)
    const dg1 = (rest < 2) ? 0 : 11 - rest
    d2 += 2 * dg1
    rest = (d2 % 11)
    const dg2 = (rest < 2) ? 0 : 11 - rest
    const digitCpf = cpf.slice(9)
    const calculatedDigit = `${dg1}${dg2}`
    if (digitCpf !== calculatedDigit) return false

    return true
  }

  get value (): string {
    return this.cpf
  }
}
