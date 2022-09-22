import { Address, IDocument, IPhone } from '@/domain/protocols'
export interface PersonaModel {
  persona_id: string
  name: string
  kind: string
  address?: Address
  document?: IDocument
  phone?: IPhone
}
