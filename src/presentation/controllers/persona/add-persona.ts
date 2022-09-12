export class AddPersonaController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Nome é inválido')
      }
    }
    return {}
  }
}
