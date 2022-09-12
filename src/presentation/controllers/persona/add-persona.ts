export class AddPersonaController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Nome é inválido')
    }
  }
}
