import { Either, left, right } from '@/shared/either'
import { InvalidUfError } from '@/domain/error'

export class Uf {
  private readonly uf: string
  constructor (uf: string) {
    this.uf = uf
  }

  static create (uf: string): Either<InvalidUfError, Uf> {
    uf = uf.trim().toUpperCase()
    if (!this.isValid(uf)) return left(new InvalidUfError(uf))
    return right(new Uf(uf))
  }

  get value (): string {
    return this.uf
  }

  static isValid (uf: string): boolean {
    if (!uf) return false

    if (uf.length < 2 || uf.length > 2) return false

    const listOfUfs = /^(?:^|(?<= ))(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)(?:(?= )|$)/gi

    const isExistedUF = listOfUfs.test(uf)
    if (!isExistedUF) return false

    return true
  }
}
