import { Either, left, right } from '@/shared/either'
import { InvalidCityError, InvalidDistrictError, InvalidParamError, InvalidStreetError, InvalidUfError } from '@/domain/error'
import { IAddress, InputAddressData } from '@/domain/protocols'
import { City, District, Street, Uf } from '@/domain/value-object'

export default class Address implements IAddress {
  addressId: number
  public readonly street: Street
  public readonly district: District
  public readonly city: City
  public readonly uf: Uf
  number: string
  complement: string
  cep: string
  status: string

  private constructor (street: Street, district: District, city: City, uf: Uf) {
    this.addressId = 0
    this.street = street
    this.district = district
    this.city = city
    this.uf = uf
    this.cep = ''
    this.number = ''
    this.complement = ''
    this.status = ''
    Object.freeze(this)
  }

  static create (addressData: InputAddressData): Either<InvalidParamError | InvalidStreetError | InvalidDistrictError | InvalidCityError | InvalidUfError, IAddress> {
    const streetOrError: Either<InvalidParamError, Street> = Street.create(addressData.street)
    const districtOrError: Either<InvalidDistrictError, District> = District.create(addressData.district)
    const cityOrError: Either<InvalidCityError, City> = City.create(addressData.city)
    const ufOrError: Either<InvalidUfError, Uf> = Uf.create(addressData.uf)

    if (streetOrError.isLeft()) return left(streetOrError.value)
    if (districtOrError.isLeft()) return left(districtOrError.value)
    if (cityOrError.isLeft()) return left(cityOrError.value)
    if (ufOrError.isLeft()) return left(ufOrError.value)

    const street: Street = streetOrError.value
    const district: District = districtOrError.value
    const city: City = cityOrError.value
    const uf: Uf = ufOrError.value
    return right(new Address(street, district, city, uf))
  }

  validateField (field: string, value: string): string {
    const valueInValidation = value.trim()
    if (!valueInValidation.length) {
      throw new Error(`Valor de ${field.toUpperCase()} é inválido`)
    }
    return valueInValidation
  }
}
