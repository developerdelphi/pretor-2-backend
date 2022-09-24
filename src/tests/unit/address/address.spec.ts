import Address from '@/domain/entity/address'
import { InputAddressData } from '@/domain/protocols'
// import { inputAddressData } from '@/domain/protocols/address-protocols'

describe('Entidade Address', () => {
  it('Deve garantir criar uma nova instancia de endereço ', () => {
    const input: InputAddressData = {
      addressId: 1,
      street: 'valid_street',
      number: 'valid_number',
      complement: 'valid_complement',
      district: 'valid_district',
      cep: 'valid_cep',
      city: 'valid_city',
      uf: 'valid_uf'
    }
    const sut = new Address(input)
    expect(sut).toHaveProperty('addressId', 1)
    expect(sut).toHaveProperty('street', 'valid_street')
    expect(sut).toHaveProperty('number', 'valid_number')
    expect(sut).toHaveProperty('complement', 'valid_complement')
    expect(sut).toHaveProperty('district', 'valid_district')
    expect(sut).toHaveProperty('cep', 'valid_cep')
    expect(sut).toHaveProperty('city', 'valid_city')
    expect(sut).toHaveProperty('uf', 'valid_uf')
  })
})
