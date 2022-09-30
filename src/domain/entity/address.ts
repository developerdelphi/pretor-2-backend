import { Either, left, right } from '@/shared/either'
import { InvalidCepError, InvalidCityError, InvalidComplementAddressError, InvalidDistrictError, InvalidNumberAddressError, InvalidStreetError, InvalidUfError } from '@/domain/error'
import { AddressOrError, IAddress, InputAddressData } from '@/domain/protocols'
import { Cep, City, District, NumberAddress, Street, Uf } from '@/domain/value-object'
import { Status } from '../value-object/status'
import { InvalidStatusError } from '../error/invalid-status-error'
import { ComplementAddress } from '../value-object/complement-address'

export class Address implements IAddress {
  addressId: number
  private readonly _street: Street
  private readonly _number: NumberAddress
  private readonly _complement: ComplementAddress
  private readonly _district: District
  private readonly _cep: Cep
  private readonly _city: City
  private readonly _uf: Uf
  private readonly _status: Status

  private constructor (street: Street, district: District, city: City, uf: Uf, cep: Cep, status: Status, number: NumberAddress, complement: ComplementAddress) {
    this.addressId = 0
    this._street = street
    this._district = district
    this._city = city
    this._uf = uf
    this._cep = cep
    this._number = number
    this._complement = complement
    this._status = status
    Object.freeze(this)
  }

  static create (addressData: InputAddressData): AddressOrError {
    const streetOrError: Either<InvalidStreetError, Street> = Street.create(addressData.street)
    const districtOrError: Either<InvalidDistrictError, District> = District.create(addressData.district)
    const cityOrError: Either<InvalidCityError, City> = City.create(addressData.city)
    const ufOrError: Either<InvalidUfError, Uf> = Uf.create(addressData.uf)
    const cepOrError: Either<InvalidCepError, Cep> = Cep.create(addressData.cep)
    const statusOrError: Either<InvalidStatusError, Status> = Status.create(addressData.status ?? 'active')
    const numberOrError: Either<InvalidNumberAddressError, NumberAddress> = NumberAddress.create(addressData.number ?? '')
    const complementOrError: Either<InvalidComplementAddressError, ComplementAddress> = ComplementAddress.create(addressData.complement ?? '')

    if (streetOrError.isLeft()) return left(streetOrError.value)
    if (districtOrError.isLeft()) return left(districtOrError.value)
    if (cityOrError.isLeft()) return left(cityOrError.value)
    if (ufOrError.isLeft()) return left(ufOrError.value)
    if (cepOrError.isLeft()) return left(cepOrError.value)
    if (statusOrError.isLeft()) return left(statusOrError.value)
    if (numberOrError.isLeft()) return left(numberOrError.value)
    if (complementOrError.isLeft()) return left(complementOrError.value)

    const street: Street = streetOrError.value
    const district: District = districtOrError.value
    const city: City = cityOrError.value
    const uf: Uf = ufOrError.value
    const cep: Cep = cepOrError.value
    const status: Status = statusOrError.value
    const number: NumberAddress = numberOrError.value
    const complement: ComplementAddress = complementOrError.value
    return right(new Address(street, district, city, uf, cep, status, number, complement))
  }

  validateField (field: string, value: string): string {
    const valueInValidation = value.trim()
    if (!valueInValidation.length) {
      throw new Error(`Valor de ${field.toUpperCase()} é inválido`)
    }
    return valueInValidation
  }

  get street (): string {
    return this._street.value
  }

  get number (): string {
    return this._number.value
  }

  get district (): string {
    return this._district.value
  }

  get city (): string {
    return this._city.value
  }

  get uf (): string {
    return this._uf.value
  }

  get cep (): string {
    return this._cep.value
  }

  get complement (): string {
    return this._complement.value
  }

  get status (): string {
    return this._status.value
  }
}
