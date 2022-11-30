import { HttpRequest, HttpResponse , badRequest } from '@/application/helpers'
import { MissingParamError } from '@/application/errors'
import { Controller } from '@/application/contracts'

export class SignUpController implements Controller {
  handle (request: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!request.body[field]) return badRequest(new MissingParamError(field))
    }
  }
}
