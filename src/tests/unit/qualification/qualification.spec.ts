import { Qualification } from '@/domain/entity/qualification'
import { InvalidQualityError, InvalidSortError } from '@/domain/error'
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
    expect(sut.value).toHaveProperty('sort', 'nacionalidade')
    expect(sut.value).toHaveProperty('quality', 'brasileira')
  })

  test('Deve retornar um InvalidSortError se não informar um tipo de qualificação inválido', () => {
    const input: InputQualificationData = {
      id: '0',
      sort: 'n',
      quality: 'brasileira'
    }
    const sut = Qualification.create(input)
    expect(sut.value).toBeInstanceOf(InvalidSortError)
  })

  test('Deve retornar um InvalidQualityError se não informar um valor de qualificação inválido', () => {
    const input: InputQualificationData = {
      id: '0',
      sort: 'nacionalidade',
      quality: '-'
    }
    const sut = Qualification.create(input)
    expect(sut.value).toBeInstanceOf(InvalidQualityError)
  })
})
