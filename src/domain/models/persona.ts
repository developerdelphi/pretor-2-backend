import { IAddress, IDocument, IPhone } from '@/domain/protocols'
export interface PersonaModel {
  persona_id: string
  name: string
  kind: string
  address?: [IAddress] | [] | undefined
  document?: [IDocument] | [] | undefined
  phone?: [IPhone] | [] | undefined
}
