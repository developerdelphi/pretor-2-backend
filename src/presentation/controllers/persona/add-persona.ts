import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequestParam } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddPersonaController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      const sendError = new MissingParamError('Nome informado é inválido')
      return badRequestParam(sendError, 'name')
    }
    return {
      statusCode: 444,
      body: {}
    }
  }
}
