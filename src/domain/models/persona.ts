import { Address, IDocument, IPhone } from '@/domain/protocols'
export interface PersonaModel {
  id: string
  name: string
  kind: string
  address?: Address
  document?: IDocument
  phone?: IPhone
}
