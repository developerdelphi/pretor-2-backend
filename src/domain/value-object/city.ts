import { Either, left, right } from '@/shared/either'
import { InvalidCityError } from '../error'

export class City {
  private readonly city: string
  constructor (city: string) {
    this.city = city
  }

  static create (city: string): Either<InvalidCityError, City> {
    city = city.trim()
    if (!City.isValid(city)) return left(new InvalidCityError(city))
    return right(new City(city))
  }

  get value (): string {
    return this.city
  }

  static isValid (city: string): boolean {
    if (!city) return false
    if (city.length < 2 || city.length > 100) return false
    return true
  }
}
