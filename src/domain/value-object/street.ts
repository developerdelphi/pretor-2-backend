export class Street {
  private readonly street: string

  private constructor (street: string) {
    this.street = street
    Object.freeze(this)
  }

  // static create(street: string): Street | InvalidParamError{
  //   if()
  // }
}
