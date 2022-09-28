import { NumberPhone } from '@/domain/value-object/number-phone'

export interface InputPhoneData {
  number: string
  status: string
}

export interface IPhone {
  phoneId?: string
  number: NumberPhone
  status?: string
}
