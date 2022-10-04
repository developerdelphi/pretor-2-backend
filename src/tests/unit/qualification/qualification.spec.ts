import { Qualification } from '@/domain/entity/qualification'
import { InputQualificationData } from '@/domain/protocols'

describe('Qualification Entity', () => {
  test('Deve criar uma instância da classe Qualification', () => {
    const input: InputQualificationData = {
      id: '0',
      sort: 'nacionalidade',
      quality: 'brasileira'
    }
    const sut = Qualification.create(input)
    expect(sut.value).toBeInstanceOf(Qualification)
    expect(sut.value).toHaveProperty('id')
  })
})
