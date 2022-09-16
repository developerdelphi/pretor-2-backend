import Document from '@/domain/entity/document'
import { InputDocument } from '@/domain/protocols/document-protocols'

describe('Document Entity', () => {
  test('Deve criar um Document com valores válidos', () => {
    const input: InputDocument = {
      type: 'valid_type',
      identifier: 'valid_identifier',
      status: 'valid_status'
    }
    const sut = new Document('1', input.type, input.identifier, input.status)
    expect(sut).toHaveProperty('documentId', '1')
    expect(sut).toHaveProperty('type', 'valid_type')
    expect(sut).toHaveProperty('identifier', 'valid_identifier')
    expect(sut).toHaveProperty('status', 'valid_status')
  })
})
