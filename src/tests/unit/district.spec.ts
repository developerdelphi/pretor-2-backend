import { District } from '@/domain/value-object'

describe('District Value Object', () => {
  test('Deve criar um bairro com valor válido', () => {
    const district = District.create('centro')
    expect(district.value).toBeInstanceOf(District)
  })
})
