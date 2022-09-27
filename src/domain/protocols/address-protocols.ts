import { Cep, City, District, Street, Uf } from '@/domain/value-object'
import { Either } from '@/shared/either'
import { InvalidCepError, InvalidCityError, InvalidDistrictError, InvalidParamError, InvalidStreetError, InvalidUfError } from '../error'

export type AddressOrError = Either<InvalidParamError | InvalidStreetError | InvalidDistrictError | InvalidCityError | InvalidUfError | InvalidCepError, IAddress>
export interface IAddress {
  addressId: number
  street: Street
  district: District
  city: City
  uf: Uf
  cep: Cep
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
