import { NameValidator } from '@/presentation/protocols'
import validator from 'validator'

export class NameValidatorAdapter implements NameValidator {
  isValid (name: string): boolean {
    const nameSanitized = this.removeSpecialChars(name)
    const existName = !!(nameSanitized)
    const contentSpecialChars = validator.matches(nameSanitized, '[s|[0-9_]|/W|[#$%^&*()]{}/g]')
    const contentMinMaxLength = validator.isLength(nameSanitized, { min: 5, max: 250 })

    if (existName && !contentSpecialChars && contentMinMaxLength) return true
    return false
  }

  removeSpecialChars (value: string): string {
    const lowerName = value.trim().toLowerCase()
    const upperName = value.trim().toUpperCase()

    let res = ''
    for (let i = 0; i < lowerName.length; ++i) {
      if (lowerName[i] !== upperName[i] || lowerName[i].trim() === '') {
        res += value[i]
      }
    }
    return res
  }
}
