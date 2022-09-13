import { AddPersona } from '@/domain/usecases/add-persona'
import { MissingParamError } from '@/presentation/errors'
import { badRequestParam, serverError, success } from '@/presentation/helpers'
import { NameValidator, Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddPersonaController implements Controller {
  constructor (private readonly nameValidator: NameValidator, private readonly addPersona: AddPersona) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const isValidName = this.nameValidator.isValid(httpRequest.body.name)
      if (!isValidName) {
        const sendError = new MissingParamError('name')
        return badRequestParam(sendError, 'name')
      }
      const persona = await this.addPersona.add({ name: httpRequest.body.name })
      return success(persona)
    } catch (error) {
      return serverError()
    }
  }
}
