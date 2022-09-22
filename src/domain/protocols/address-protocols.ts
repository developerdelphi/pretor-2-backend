export interface Address {
  street: string
  number: string
  complement: string
  district: string
  cep: string
  city: string
  uf: string
}

export interface InputAddressData {
  street: string
  number: string
  complement?: string
  district?: string
  cep?: string
  city?: string
  uf?: string
}
