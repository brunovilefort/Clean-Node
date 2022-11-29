import { HttpRequest, HttpResponse , badRequest } from '@/application/helpers'
import { MissingParamError } from '@/application/errors'

export class SignUpController {
  handle (request: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!request.body[field]) return badRequest(new MissingParamError(field))
    }
  }
}
