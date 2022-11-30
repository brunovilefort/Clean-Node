import { HttpRequest, HttpResponse , badRequest, serverError } from '@/application/helpers'
import { InvalidParamError, MissingParamError } from '@/application/errors'
import { Controller, EmailValidator } from '@/application/contracts'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = request.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!request.body[field]) return badRequest(new MissingParamError(field))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
    } catch (error) { return serverError(error) }
  }
}
