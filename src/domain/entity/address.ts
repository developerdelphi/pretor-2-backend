import { Either, left, right } from '@/shared/either'
import { InvalidDistrictError, InvalidParamError, InvalidStreetError } from '@/domain/error'
import { IAddress, InputAddressData } from '@/domain/protocols'
import { Street } from '@/domain/value-object/street'
import { District } from '../value-object'

export default class Address implements IAddress {
  addressId: number
  public readonly street: Street
  public readonly district: District
  number: string
  complement: string
  cep: string
  city: string
  uf: string
  status: string

  private constructor (street: Street, district: District) {
    this.addressId = 0
    this.street = street
    this.district = district
    this.cep = ''
    this.city = ''
    this.uf = ''
    this.number = ''
    this.complement = ''
    this.status = ''
    Object.freeze(this)
  }

  static create (addressData: InputAddressData): Either<InvalidParamError | InvalidStreetError | InvalidDistrictError, IAddress> {
    const streetOrError: Either<InvalidParamError, Street> = Street.create(addressData.street)
    const districtOrError: Either<InvalidDistrictError, District> = District.create(addressData.district)
    if (streetOrError.isLeft()) return left(streetOrError.value)
    if (districtOrError.isLeft()) return left(districtOrError.value)

    const street: Street = streetOrError.value
    const district: District = districtOrError.value
    return right(new Address(street, district))
  }

  validateField (field: string, value: string): string {
    const valueInValidation = value.trim()
    if (!valueInValidation.length) {
      throw new Error(`Valor de ${field.toUpperCase()} é inválido`)
    }
    return valueInValidation
  }
}
