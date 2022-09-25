import { Either, right } from '@/shared/either'
import { InvalidDistrictError } from '../error'

interface IDistrict {
  value: string
}

export class District implements IDistrict {
  private readonly district: string

  private constructor (district: string) {
    this.district = district
    Object.freeze(this)
  }

  static create (district: string): Either<InvalidDistrictError, IDistrict> {
    district = district.trim()
    return right(new District(district))
  }

  get value (): string {
    return this.district
  }
}
