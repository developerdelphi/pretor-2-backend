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
  readonly personaId: number
  street: string
  number: string
  complement?: string
  district?: string
  cep?: string
  city?: string
  uf?: string
}
