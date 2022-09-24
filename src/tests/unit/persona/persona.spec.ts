import Address from '@/domain/entity/address'
import Document from '@/domain/entity/document'
import { Persona } from '@/domain/entity/persona'
import Phone from '@/domain/entity/phone'
import { InputAddressData, InputDocument, InputPhoneData, InputPersonaData } from '@/domain/protocols'

const makeSut = (inputPersonaData: InputPersonaData): Persona => {
  const sut = new Persona('1', inputPersonaData.name, inputPersonaData.kind)
  return sut
}

describe('Persona Entity', () => {
  test('Deve tentar cadastrar uma pessoa com um nome inválido', () => {
    const input = { name: 'no', kind: 'F' }
    expect(() => makeSut(input)).toThrow(new Error('Invalid name'))
  })

  test('Deve cadastrar uma pessoa com um nome válido', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = new Persona('1', input.name, input.kind)
    expect(sut.name).toBe('valid name')
  })

  test('Deve criar uma pessoa como pessoa física', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = new Persona('1', input.name, input.kind)
    expect(sut.kind).toEqual('F')
  })

  test('Deve criar uma pessoa e adicionar endereço', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = new Persona('1', input.name, input.kind)
    const inputAddress: InputAddressData = {
      street: 'Rua Principal',
      number: 'sn',
      complement: 'Qd. 04, Lt. 12',
      district: 'Centro',
      cep: '75100-100',
      city: 'Sossego',
      uf: 'GO'
    }
    sut.addAddress(new Address(inputAddress))
    expect(sut.address).toHaveLength(1)
  })

  test('Deve criar uma pessoa e adicionar telefone', () => {
    const input = { name: 'valid name', kind: 'F' }
    const sut = new Persona('1', input.name, input.kind)
    const phone: InputPhoneData = {
      number: 'valid_number',
      status: 'valid_status'
    }
    sut.addPhone(new Phone('1', phone.number, phone.status))
    expect(sut.phone[0]).toEqual({ phoneId: '1', ...phone })
  })

  test('Deve criar uma nova pessoa e adicionar Documento', () => {
    const input: InputPersonaData = { name: 'valid name', kind: 'F' }
    const doc: InputDocument = {
      type: 'valid_type',
      identifier: 'valid_identifier',
      status: 'valid_status'
    }
    const sut = new Persona('1', input.name, input.kind)
    sut.addDocument(new Document('1', doc.type, doc.identifier, doc.status))
    expect(sut.document[0]).toEqual({ documentId: '1', ...doc })
  })
})
