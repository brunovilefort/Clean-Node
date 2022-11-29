import { HttpRequest, HttpResponse } from '@/application/helpers'
import { MissingParamError } from '@/application/errors'

export class SignUpController {
  handle (request: HttpRequest): HttpResponse {
    if (!request.body.name) return { statusCode: 400, body: new MissingParamError('name') }
    if (!request.body.email) return { statusCode: 400, body: new MissingParamError('email') }
  }
}
