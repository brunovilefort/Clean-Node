import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'

describe('BcryptAdapter', () => {
  let salt: number
  let sut: BcryptAdapter

  beforeAll(() => {
    salt = 12
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  it('Should call bcrypt with correct input', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    expect(hashSpy).toHaveBeenCalledTimes(1)
  })
})
