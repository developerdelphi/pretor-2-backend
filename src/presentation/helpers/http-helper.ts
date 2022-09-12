import { HttpResponse } from '../protocols/http'

export const badRequestParam = (error: Error, field: string): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      field,
      data: error
    }
  }
}
