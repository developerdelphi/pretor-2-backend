import Address from '@/domain/entity/address'
import { InvalidStreetError } from '@/domain/error'
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
  test('Deve criar uma nova instancia de endereço ', () => {
    const input: InputAddressData = {
      addressId: 0,
      street: 'Rua Principal',
      number: 'valid_number',
      complement: 'valid_complement',
      district: 'valid_district',
      cep: '75000-000',
      city: 'valid_city',
      uf: 'GO'
    }
    const { sut } = makeSut(input)
    const address = sut.value
    expect(address).toBeInstanceOf(Address)
  })

  test('Deve tentar criar uma nova instancia de endereço passando street inválida', () => {
    const input: InputAddressData = {
      addressId: 0,
      street: '',
      number: 'valid_number',
      complement: 'valid_complement',
      district: 'valid_district',
      cep: '75000-000',
      city: 'valid_city',
      uf: 'GO'
    }
    const { sut } = makeSut(input)
    const address = sut.value
    expect(address).toBeInstanceOf(InvalidStreetError)
  })
})
