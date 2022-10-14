export default interface IHttpServer {
  on: (url: string, method: string, fn: any) => void
  listen: (port: number) => void
}
