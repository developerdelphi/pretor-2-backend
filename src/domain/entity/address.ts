export default class Address {
  constructor (readonly personaId: number, readonly street: string, readonly number?: string, readonly complement?: string, readonly district?: string, readonly cep?: string, readonly city?: string, readonly uf?: string) {}
}
