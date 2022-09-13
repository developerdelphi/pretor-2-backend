import { NameValidator } from '@/presentation/protocols'

export class NameValidatorAdapter implements NameValidator {
  isValid (name: string): boolean {
    return false
  }
}
