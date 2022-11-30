import { SignUpController } from '@/application/controllers'
import { MissingParamError } from '@/application/errors'

describe('SignUpController', () => {
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let sut: SignUpController

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
    passwordConfirmation = 'any_password'
  })

  beforeEach(() => {
    sut = new SignUpController()
  })

  it('Should return 400 if no name is provided', () => {
    const request = { body: { email, password, passwordConfirmation } }

    const response = sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  it('Should return 400 if no email is provided', () => {
    const request = { body: { name, password, passwordConfirmation } }

    const response = sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', () => {
    const request = { body: { name, email, passwordConfirmation } }

    const response = sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  it('Should return 400 if no password confirmation is provided', () => {
    const request = { body: { name, email, password } }

    const response = sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})
