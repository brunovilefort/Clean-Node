import { SignUpController } from '@/application/controllers'
import { MissingParamError, InvalidParamError } from '@/application/errors'
import { EmailValidator } from '@/application/contracts'
import { serverError } from '@/application/helpers'
import { AddAccount } from '@/domain/contracts/gateways'

import { mock, MockProxy } from 'jest-mock-extended'

describe('SignUpController', () => {
  let id: string
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let httpRequest: { body: { name: string, email: string, password: string, passwordConfirmation: string } }
  let emailValidator: MockProxy<EmailValidator>
  let addAccount: MockProxy<AddAccount>
  let sut: SignUpController

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
    passwordConfirmation = 'any_password'
    httpRequest = { body: { name, email, password, passwordConfirmation } }
    emailValidator = mock()
    addAccount = mock()
    emailValidator.isValid.mockReturnValue(true)
    addAccount.add.mockResolvedValue({ id, name, email, password })
  })

  beforeEach(() => {
    sut = new SignUpController(emailValidator, addAccount)
  })

  it('Should return 400 if no name is provided', async () => {
    const request = { body: { email, password, passwordConfirmation } }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  it('Should return 400 if no email is provided', async () => {
    const request = { body: { name, password, passwordConfirmation } }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', async () => {
    const request = { body: { name, email, passwordConfirmation } }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  it('Should return 400 if no password confirmation is provided', async () => {
    const request = { body: { name, email, password } }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  it('Should return 400 if password confirmation fails', async () => {
    passwordConfirmation = 'invalid_password'
    const request = { body: { name, email, password, passwordConfirmation } }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  it('Should return 400 if no invalid email is provided', async () => {
    emailValidator.isValid.mockReturnValueOnce(false)
    const request = httpRequest

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  it('Should call EmailValidator with correct input', async () => {
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    const request = httpRequest

    await sut.handle(request)

    expect(isValidSpy).toHaveBeenCalledWith(email)
    expect(isValidSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if EmailValidator throws', async () => {
    emailValidator.isValid.mockImplementationOnce(() => { throw new Error() })
    const request = httpRequest

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response).toEqual(serverError(new Error()))
  })

  it('Should call AddAccount with correct input', async () => {
    const request = httpRequest
    const addSpy = jest.spyOn(addAccount, 'add')

    await sut.handle(request)

    expect(addSpy).toHaveBeenCalledWith({ name, email, password })
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if AddAccount throws', async () => {
    addAccount.add.mockImplementationOnce(() => { throw new Error() })
    const request = httpRequest

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid data is provided', async () => {
    const request = httpRequest

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ id, name, email, password })
  })
})
