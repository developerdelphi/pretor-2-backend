import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequestParam = (error: Error, field: string): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      field,
      data: error
    }
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
