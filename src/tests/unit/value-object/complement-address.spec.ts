import { InvalidComplementAddressError } from '@/domain/entity/persona/error'
import { ComplementAddress } from '@/domain/value-object/complement-address'

describe('Complement Address Value Object', () => {
  test('Deve retornar uma instância de Address', () => {
    const inputComplement = 'Qd. 01, Lt. 02, Casa 02'
    const sut = ComplementAddress.create(inputComplement)
    expect(sut.value).toBeInstanceOf(ComplementAddress)
  })

  test('Deve retornar uma instância com  value "" se não informar complement', () => {
    const inputComplement = ''
    const sut = ComplementAddress.create(inputComplement)
    expect(sut.value).toBeInstanceOf(ComplementAddress)
    expect(sut.value).toHaveProperty('complement', '')
  })

  test('Deve retornar InvalidComplementAddressError ao informa valores superior a 100 caracteres', () => {
    const inputComplement = 'a'.repeat(110)
    const sut = ComplementAddress.create(inputComplement)
    expect(sut.value).toBeInstanceOf(InvalidComplementAddressError)
    expect(sut.value).toEqual(new InvalidComplementAddressError(inputComplement))
  })
})
