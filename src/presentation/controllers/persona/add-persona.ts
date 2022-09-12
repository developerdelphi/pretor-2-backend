import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequestParam } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddPersonaController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name']
    for (const field of requiredFields) {
      if (!httpRequest.body.name) {
        const sendError = new MissingParamError('Nome informado é inválido')
        return badRequestParam(sendError, field)
      }
    }
    return {
      statusCode: 444,
      body: {}
    }
  }
}
