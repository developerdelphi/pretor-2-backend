import Address from '@/domain/entity/address'
import { IAddress, InputAddressData } from '@/domain/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { Either } from '@/shared/either'

const makeAddress = (input: InputAddressData): Either<InvalidParamError, IAddress> => {
  return Address.create(input)
}

interface sutType {
  sut: Either<InvalidParamError, IAddress>
}
const makeSut = (input: InputAddressData): sutType => {
  const sut = makeAddress(input)
  return { sut }
}

describe('Entidade Address', () => {
  it('Deve criar uma nova instancia de endereço ', () => {
    const input: InputAddressData = {
      addressId: 0,
      street: 'Rua Principal',
      number: 'valid_number',
      complement: 'valid_complement',
      district: 'valid_district',
      cep: 'valid_cep',
      city: 'valid_city',
      uf: 'GO'
    }
    const { sut } = makeSut(input)
    const address = sut.value
    expect(address).toHaveProperty('addressId', 0)
    // expect(address).toHaveProperty('street', 'Rua Principal')
    // expect(address).toHaveProperty('number', 'valid_number')
    // expect(address).toHaveProperty('complement', 'valid_complement')
    // expect(address).toHaveProperty('district', 'valid_district')
    // expect(address).toHaveProperty('cep', 'valid_cep')
    // expect(address).toHaveProperty('city', 'valid_city')
    // expect(address).toHaveProperty('uf', 'valid_uf')
  })

  // it('Deve tentar criar uma nova instancia de endereço sem informar street', () => {
  //   const { sut } = makeSut()
  //   // const spyValidated = jest.spyOn(sut, 'validateField').mockImplementationOnce(() => { throw new Error() })
  //   expect(spyValidated).toThrow('street é invalido')
  // })
})
