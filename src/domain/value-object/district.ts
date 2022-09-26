import { Either, left, right } from '@/shared/either'
import { InvalidDistrictError } from '../error'

// export interface IDistrict {
//   readonly district: string
// }

export class District implements District {
  private readonly district: string

  private constructor (district: string) {
    this.district = district
    Object.freeze(this)
  }

  static create (district: string): Either<InvalidDistrictError, District> {
    district = district.trim()
    if (!District.isValid(district)) return left(new InvalidDistrictError(district))
    return right(new District(district))
  }

  get value (): string {
    return this.district
  }

  static isValid (district: string): boolean {
    if (!district) return false
    if (district.length < 2 || district.length > 50) return false
    return true
  }
}
