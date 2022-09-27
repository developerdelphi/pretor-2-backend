import { Either, left, right } from '@/shared/either'
import { InvalidCepError, InvalidCityError, InvalidDistrictError, InvalidStreetError, InvalidUfError } from '@/domain/error'
import { AddressOrError, IAddress, InputAddressData } from '@/domain/protocols'
import { Cep, City, District, Street, Uf } from '@/domain/value-object'

export class Address implements IAddress {
  addressId: number
  public readonly street: Street
  public readonly district: District
  public readonly city: City
  public readonly uf: Uf
  public readonly cep: Cep
  number: string
  complement: string
  status: string

  private constructor (street: Street, district: District, city: City, uf: Uf, cep: Cep) {
    this.addressId = 0
    this.street = street
    this.district = district
    this.city = city
    this.uf = uf
    this.cep = cep
    this.number = ''
    this.complement = ''
    this.status = ''
    Object.freeze(this)
  }

  static create (addressData: InputAddressData): AddressOrError {
    const streetOrError: Either<InvalidStreetError, Street> = Street.create(addressData.street)
    const districtOrError: Either<InvalidDistrictError, District> = District.create(addressData.district)
    const cityOrError: Either<InvalidCityError, City> = City.create(addressData.city)
    const ufOrError: Either<InvalidUfError, Uf> = Uf.create(addressData.uf)
    const cepOrError: Either<InvalidCepError, Cep> = Cep.create(addressData.cep)

    if (streetOrError.isLeft()) return left(streetOrError.value)
    if (districtOrError.isLeft()) return left(districtOrError.value)
    if (cityOrError.isLeft()) return left(cityOrError.value)
    if (ufOrError.isLeft()) return left(ufOrError.value)
    if (cepOrError.isLeft()) return left(cepOrError.value)

    const street: Street = streetOrError.value
    const district: District = districtOrError.value
    const city: City = cityOrError.value
    const uf: Uf = ufOrError.value
    const cep: Cep = cepOrError.value
    return right(new Address(street, district, city, uf, cep))
  }

  validateField (field: string, value: string): string {
    const valueInValidation = value.trim()
    if (!valueInValidation.length) {
      throw new Error(`Valor de ${field.toUpperCase()} é inválido`)
    }
    return valueInValidation
  }
}
