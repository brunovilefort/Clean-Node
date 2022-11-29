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
