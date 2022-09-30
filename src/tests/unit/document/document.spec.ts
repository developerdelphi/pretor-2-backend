import { Document } from '@/domain/entity'
import { InputDocumentData } from '@/domain/protocols/document-protocols'

describe('Document Entity', () => {
  test('Deve criar um Document com valores válidos', () => {
    const input: InputDocumentData = {
      type: 'valid_type',
      identifier: 'valid_identifier',
      status: 'valid_status'
    }
    const sut = Document.create(input)
    expect(sut.value).toBeInstanceOf(Document)
    expect(sut.value).toHaveProperty('id', '0')
    expect(sut.value).toHaveProperty('type', 'valid_type')
    expect(sut.value).toHaveProperty('identifier', 'valid_identifier')
    expect(sut.value).toHaveProperty('status', 'valid_status')
  })
})
