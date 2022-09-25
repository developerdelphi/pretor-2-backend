import { Either, left, right } from '@/shared/either'
import InvalidParamError from '../error/invalid-param-error'
import { IAddress, InputAddressData } from '../protocols'
import { Street } from '../value-object/street'

export default class Address implements IAddress {
  addressId: number
  public readonly street: Street
  number: string
  complement: string
  district: string
  cep: string
  city: string
  uf: string
  status: string

  private constructor (street: Street) {
    this.addressId = 0
    this.street = street
    this.district = ''
    this.cep = ''
    this.city = ''
    this.uf = ''
    this.number = ''
    this.complement = ''
    this.status = ''
    Object.freeze(this)
  }

  static create (addressData: InputAddressData): Either<InvalidParamError, IAddress> {
    const streetOrError: Either<InvalidParamError, Street> = Street.create(addressData.street)
    if (streetOrError.isLeft()) {
      return left(streetOrError.value)
    }
    const street: Street = streetOrError.value
    return right(new Address(street))
  }

  validateField (field: string, value: string): string {
    const valueInValidation = value.trim()
    if (!valueInValidation.length) {
      throw new Error(`Valor de ${field.toUpperCase()} é inválido`)
    }
    return valueInValidation
  }
}
