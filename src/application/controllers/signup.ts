import { HttpRequest, HttpResponse , badRequest } from '@/application/helpers'
import { MissingParamError } from '@/application/errors'

export class SignUpController {
  handle (request: HttpRequest): HttpResponse {
    if (!request.body.name) return badRequest(new MissingParamError('name'))
    if (!request.body.email) return badRequest(new MissingParamError('email'))
  }
}
