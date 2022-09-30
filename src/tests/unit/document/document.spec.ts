import { Document } from '@/domain/entity'
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
})
