export interface Connection {
  query: (statement: string, params: any[]) => Promise<any>
}
