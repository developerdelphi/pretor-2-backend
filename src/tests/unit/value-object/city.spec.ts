import { InvalidCityError } from '@/domain/entity/persona/error'
import { City } from '@/domain/value-object/city'

describe('City Value Object', () => {
  test('Deve criar uma cidade com valor válido', () => {
    const city = City.create('cidade')
    expect(city.value).toBeInstanceOf(City)
  })

  test('Não Deve criar uma cidade com valor inválido', () => {
    const cityInput = ''
    const city = City.create(cityInput)
    expect(city.value).toBeInstanceOf(InvalidCityError)
  })

  test('Não Deve criar uma cidade com string menor 2 caracteres', () => {
    const cityInput = 'n'
    const city = City.create(cityInput)
    expect(city.value).toBeInstanceOf(InvalidCityError)
  })

  test('Não Deve criar uma cidade com string maior 100 caracteres', () => {
    const cityInput = 'n'.repeat(110)
    const city = City.create(cityInput)
    expect(city.value).toBeInstanceOf(InvalidCityError)
  })
})
