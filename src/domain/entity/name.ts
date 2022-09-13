export default class Name {
  value: string = ''
  constructor (value: string) {
    if (!this.validate(value)) throw Error('Invalid name')
  }

  private validate (name: string): boolean {
    const nameSanitized = this.removeSpecialChars(name)
    const existName = !!(nameSanitized)
    // eslint-disable-next-line no-empty-character-class
    const contentSpecialChars = !!(nameSanitized.match(/[0-9_]|\[#$%&"*()_=+@!'?:,{}[]\]/gm))
    const contentMinMaxLength = !!((nameSanitized.length >= 5 && nameSanitized.length <= 250))
    if (existName && !contentSpecialChars && contentMinMaxLength) {
      this.value = nameSanitized
      return true
    }
    return false
  }

  private removeSpecialChars (inputName: string): string {
    const lowerName = inputName.trim().toLowerCase()
    const upperName = inputName.trim().toUpperCase()

    let outputName = ''
    for (let i = 0; i < lowerName.length; ++i) {
      if (lowerName[i] !== upperName[i] || lowerName[i].trim() === '') {
        outputName += inputName[i]
      }
    }
    return outputName.trim()
  }
}
