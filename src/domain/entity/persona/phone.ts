import { Either, left, right } from '@/shared/either'
import { InvalidNumberPhoneError } from '../../error'
import { InputPhoneData, IPhone } from '../../protocols'
import { NumberPhone } from '../../value-object/number-phone'

export class Phone implements IPhone {
  private constructor (readonly phoneId: string, readonly number: NumberPhone, readonly status: string = 'active') { }

  static create (phone: InputPhoneData): Either<InvalidNumberPhoneError, Phone> {
    const numberOrError: Either<InvalidNumberPhoneError, NumberPhone> = NumberPhone.create(phone.number)
    if (numberOrError.isLeft()) return left(new InvalidNumberPhoneError(phone.number))
    const numberInput: NumberPhone = numberOrError.value
    return right(new Phone('0', numberInput)
    )
  }
}
