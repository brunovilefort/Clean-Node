import { BcryptAdapter } from '@/infra/gateways'
import { throwError } from '@/tests/mocks'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let salt: number
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let sut: BcryptAdapter

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => 'hash')
    salt = 12
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  it('Should call bcrypt with correct input', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    expect(hashSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return a hash on success', async () => {
    const hash = await sut.hash('any_value')

    expect(hash).toBe('hash')
  })

  it('Should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })
})
