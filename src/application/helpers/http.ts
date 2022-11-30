import { ServerError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export type HttpRequest<T = any> = {
  body?: T
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
