import { Either, left, right } from '@/shared/either'
import { InvalidNumberPhoneError } from '../error'
import { InputPhoneData } from '../protocols'

export class Phone {
  private constructor (readonly phoneId: string, readonly number: string, readonly status: string = 'active') { }

  static create (phone: InputPhoneData): Either<InvalidNumberPhoneError, Phone> {
    if (!phone.number) return left(new InvalidNumberPhoneError(phone.number))
    return right(new Phone('0', phone.number)
    )
  }
}
