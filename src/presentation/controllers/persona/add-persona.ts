import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { ServerError } from '@/presentation/errors/server-error'
import { badRequestParam } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { NameValidator } from '@/presentation/protocols/name-validator'

export class AddPersonaController implements Controller {
  constructor (private readonly nameValidator: NameValidator) {}
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const isValidName = this.nameValidator.isValid(httpRequest.body.name)
      if (!isValidName) {
        const sendError = new MissingParamError('name')
        return badRequestParam(sendError, 'name')
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
    return {
      statusCode: 500,
      body: {}
    }
  }
}
