import { InvalidDistrictError } from '@/domain/error'
import { District } from '@/domain/value-object'

describe('District Value Object', () => {
  test('Deve criar um bairro com valor válido', () => {
    const district = District.create('centro')
    expect(district.value).toBeInstanceOf(District)
  })

  test('Não Deve criar um bairro com valor inválido', () => {
    const districtInput = ''
    const district = District.create(districtInput)
    expect(district.value).toBeInstanceOf(InvalidDistrictError)
  })

  test('Não Deve criar um bairro com string menor 2 caracteres', () => {
    const districtInput = 'n'
    const district = District.create(districtInput)
    expect(district.value).toBeInstanceOf(InvalidDistrictError)
  })

  test('Não Deve criar um bairro com string maior 50 caracteres', () => {
    const districtInput = 'n'.repeat(55)
    const district = District.create(districtInput)
    expect(district.value).toBeInstanceOf(InvalidDistrictError)
  })
})
