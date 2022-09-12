import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddPersonaController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Nome é inválido')
      }
    }
    return {
      statusCode: 444,
      body: {}
    }
  }
}
