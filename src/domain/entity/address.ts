import { IAddress, InputAddressData } from '../protocols'

export default class Address implements IAddress {
  addressId: number
  street: string
  number: string
  complement: string
  district: string
  cep: string
  city: string
  uf: string
  status: string

  constructor (input: InputAddressData) {
    this.addressId = input.addressId ?? 0
    this.street = this.validateField('street', input.street)
    this.district = this.validateField('district', input.district)
    this.cep = this.validateField('cep', input.cep)
    this.city = this.validateField('city', input.city)
    this.uf = this.validateField('uf', input.uf)
    this.number = input.number?.trim() ?? ''
    this.complement = input.complement?.trim() ?? ''
    this.status = input.status?.trim() ?? ''
  }

  validateField (field: string, value: string): string {
    const valueInValidation = value.trim()
    if (!valueInValidation.length) {
      throw new Error(`Valor de ${field.toUpperCase()} é inválido`)
    }
    return valueInValidation
  }
}
