import { Either, left, right } from '@/shared/either'
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
    if (!District.isValid(district)) return left(new InvalidDistrictError(district))
    return right(new District(district))
  }

  get value (): string {
    return this.district
  }

  static isValid (district: string): boolean {
    if (!district) return false
    return true
  }
}
