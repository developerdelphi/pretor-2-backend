import { Either, left, right } from '@/shared/either'
import { InvalidQualityError } from '../error'

export class Quality {
  private readonly quality: string

  private constructor (quality: string) {
    this.quality = quality
  }

  static create (quality: string): Either<InvalidQualityError, Quality> {
    quality = quality.trim()
    if (!Quality.isValid(quality)) return left(new InvalidQualityError(quality))
    return right(new Quality(quality))
  }

  static isValid (quality: string): boolean {
    if (!quality) return false
    if ((quality.length < 2) || (quality.length > 50)) return false
    return true
  }

  get value (): string {
    return this.quality
  }
}