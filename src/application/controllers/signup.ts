import { HttpRequest, HttpResponse , badRequest } from '@/application/helpers'
import { InvalidParamError, MissingParamError } from '@/application/errors'
import { Controller, EmailValidator } from '@/application/contracts'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (request: HttpRequest): HttpResponse {
    const { email } = request.body
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!request.body[field]) return badRequest(new MissingParamError(field))
    }
    const isValid = this.emailValidator.isValid(email)
    if (!isValid) return badRequest(new InvalidParamError('email'))
  }
}
