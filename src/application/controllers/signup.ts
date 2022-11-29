import { HttpRequest, HttpResponse } from '@/application/helpers'

export class SignUpController {
  handle (request: HttpRequest): HttpResponse {
    if (!request.body.name) return { statusCode: 400, body: new Error('Missing param: name') }
    if (!request.body.email) return { statusCode: 400, body: new Error('Missing param: email') }
  }
}
