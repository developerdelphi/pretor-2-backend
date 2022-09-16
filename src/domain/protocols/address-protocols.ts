export interface Address {
  street: string
  number: string
  complement: string
  district: string
  cep: string
  city: string
  uf: string
}

export interface inputAddressData {
  street: string
  number: string
  complement?: string
  district?: string
  cep?: string
  city?: string
  uf?: string
}
