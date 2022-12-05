import { throwError } from '@/tests/mocks'
import { DbAddAccount } from '@/domain/use-cases'
import { Hasher } from '@/domain/contracts/gateways'
import { AddAccountRepository } from '@/domain/contracts/repositories'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DbAddAccount', () => {
  let name: string
  let email: string
  let password: string
  let accountData: { name: string, email: string, password: string }
  let hasher: MockProxy<Hasher>
  let addAccountRepository: MockProxy<AddAccountRepository>
  let sut: DbAddAccount

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
    accountData = { name, email, password }
    hasher = mock()
    addAccountRepository = mock()
    hasher.hash.mockResolvedValue('hashed_password')
    addAccountRepository.add.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new DbAddAccount(hasher, addAccountRepository)
  })

  it('Should call Hasher with correct input', async () => {
    const hasherSpy = jest.spyOn(hasher, 'hash')

    await sut.add(accountData)

    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should throw if Hasher throws', async () => {
    jest.spyOn(hasher, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct input', async () => {
    const addSpy = jest.spyOn(addAccountRepository, 'add')

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({ name, email, password: 'hashed_password' })
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should throw if AddAccountRepository throws', async () => {
    jest.spyOn(addAccountRepository, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  it('Should return an account on success', async () => {
    const account = await sut.add(accountData)

    expect(account).toBe(true)
  })
})
