export default class Name {
  value: string
  constructor (value: string) {
    if (!this.validate(value)) throw Error('Invalid name')
    this.value = value
  }

  private validate (name: string): boolean {
    const nameSanitized = this.removeSpecialChars(name)
    const existName = !!(nameSanitized)
    // eslint-disable-next-line no-empty-character-class
    const contentSpecialChars = !!(nameSanitized.match(/[0-9_]|\W|\[#$%&"*()_=+@!'?:,{}[]\]/g))
    // console.log('O nome contem char especial:', contentSpecialChars)
    const contentMinMaxLength = !!((nameSanitized.length >= 5 && nameSanitized.length <= 250))
    if (existName && !contentSpecialChars && contentMinMaxLength) {
      // console.log(nameSanitized)
      this.value = nameSanitized
      return true
    }
    return false
  }

  private removeSpecialChars (value: string): string {
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
