import { MissingParamError } from '@/presentation/errors'
import { badRequestParam, serverError } from '@/presentation/helpers'
import { NameValidator, Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

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
      return serverError()
    }
    return {
      statusCode: 500,
      body: {}
    }
  }
}
