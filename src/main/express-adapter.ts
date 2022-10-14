import express, { Request, Response } from 'express'
import IHttpServer from './http-server'

export default class ExpressAdapter implements IHttpServer {
  app: any

  constructor () {
    this.app = express()
    this.app.use(express.json())
  }

  on (url: string, method: string, fn: any): void {
    this.app[method](url, async function (request: Request, response: Response) {
      const output = await fn(request.params, request.body)
      return response.json(output)
    })
  }

  listen (port: number): void {
    this.app.listen(port)
  }
}
