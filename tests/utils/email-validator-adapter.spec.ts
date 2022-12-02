import { EmailValidatorAdapter } from '@/utils'

import validator from 'validator'

jest.mock('validator')

describe('EmailValidatorAdapter', () => {
  let fakeValidator: jest.Mocked<typeof validator>
  let sut: EmailValidatorAdapter

  beforeAll(() => {
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isEmail.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new EmailValidatorAdapter()
  })

  it('Should return false if validator returns false', () => {
    fakeValidator.isEmail.mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  it('Should call validator with correct input', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('valid_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
