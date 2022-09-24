export interface IAddress {
  addressId: number
  street: string
  number: string
  complement: string
  district: string
  cep: string
  city: string
  uf: string
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
