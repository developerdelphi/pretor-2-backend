import { InvalidStatusError } from '@/domain/error/invalid-status-error'
import { Status } from '@/domain/value-object/status'

describe('Status Value Objects', () => {
  test('Deve criar uma instância da classe Status com valor active', () => {
    const sut = Status.create('active')
    expect(sut.value).toBeInstanceOf(Status)
  })

  test('Deve criar uma instância da classe Status com valor inactive', () => {
    const sut = Status.create('inactive')
    expect(sut.value).toBeInstanceOf(Status)
  })

  test('Deve retornar InvalidStatusError se não informar o valor', () => {
    const sut = Status.create('')
    expect(sut.value).toBeInstanceOf(InvalidStatusError)
  })

  test('Deve retornar InvalidStatusError se informar status desconhecido', () => {
    // active|inactive
    const sut = Status.create('invalid')
    expect(sut.value).toBeInstanceOf(InvalidStatusError)
  })
})
