import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddPersonaController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: {
          field: 'name',
          data: new MissingParamError('Nome informado é inválido')
        }
      }
    }
    return {
      statusCode: 444,
      body: {}
    }
  }
}
