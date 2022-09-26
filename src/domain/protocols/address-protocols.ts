import { Cep, City, District, Street, Uf } from '@/domain/value-object'
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
