import { Document } from '@/domain/entity'
import { InvalidCpfError } from '@/domain/error'
import { InputDocumentData } from '@/domain/protocols/document-protocols'

describe('Document Entity', () => {
  test('Deve criar um Document com valores válidos', () => {
    const input: InputDocumentData = {
      kind: 'valid_kind',
      identifier: 'valid_identifier',
      status: 'active'
    }
    const sut = Document.create(input)
    expect(sut.value).toBeInstanceOf(Document)
    expect(sut.value).toHaveProperty('id', '0')
    expect(sut.value).toHaveProperty('kind', 'valid_kind')
    expect(sut.value).toHaveProperty('identifier', 'valid_identifier')
    expect(sut.value).toHaveProperty('status', 'active')
  })

  test('Deve retornar InvalidCpfError se informar um CPF inválido', () => {
    const input: InputDocumentData = {
      kind: 'CPF',
      identifier: 'valid_identifier',
      status: 'active'
    }
    const sut = Document.create(input)
    expect(sut.value).toBeInstanceOf(InvalidCpfError)
  })

  test('Deve criar um Document com CPF válido', () => {
    const input: InputDocumentData = {
      kind: 'CPF',
      identifier: '357.188.378-05',
      status: 'active'
    }
    const sut = Document.create(input)
    expect(sut.value).toBeInstanceOf(Document)
  })
})
