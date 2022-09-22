import { InputAddressData, InputDocument, InputPhoneData } from './'
export interface InputPersonaData {
  name: string
  kind: string
  address?: [InputAddressData]
  document?: [InputDocument]
  phone?: [InputPhoneData]
}
