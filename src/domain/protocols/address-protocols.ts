import { Either } from '@/shared/either'
import { InvalidCepError, InvalidCityError, InvalidDistrictError, InvalidNumberAddressError, InvalidStatusError, InvalidStreetError, InvalidUfError } from '@/domain/error'

export type AddressOrError = Either<InvalidStreetError | InvalidDistrictError | InvalidCityError | InvalidUfError | InvalidCepError | InvalidStatusError | InvalidNumberAddressError, IAddress>
export interface IAddress {
  addressId: number
  street: string
  district: string
  city: string
  uf: string
  cep: string
  number: string
  complement: string
  status: string
}

export interface InputAddressData {
  addressId?: number
  street: string
  number?: string
  complement?: string
  district: string
  cep: string
  city: string
  uf: string
  status?: string
}
