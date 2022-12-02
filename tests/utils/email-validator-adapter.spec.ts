import { EmailValidatorAdapter } from '@/utils'

describe('EmailValidatorAdapter', () => {
  let sut: EmailValidatorAdapter

  beforeEach(() => {
    sut = new EmailValidatorAdapter()
  })

  it('Should return false if validator returns false', () => {
    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })
})
