import { DbAddAccount } from '@/domain/use-cases'
import { Encrypter } from '@/domain/contracts/gateways'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DbAddAccount', () => {
  let encrypter: MockProxy<Encrypter>
  let accountData: { name: string, email: string, password: string }
  let sut: DbAddAccount

  beforeAll(() => {
    encrypter = mock()
    encrypter.encrypt.mockResolvedValue('hashed_password')
    accountData = { name: 'valid_name', email: 'valid_email', password: 'valid_password' }
  })

  beforeEach(() => {
    sut = new DbAddAccount(encrypter)
  })

  it('Should call Encrypter with correct input', async () => {
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
