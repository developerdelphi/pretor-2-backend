export interface PersonaRepository {
  create: (data: any) => Promise<void>
}
