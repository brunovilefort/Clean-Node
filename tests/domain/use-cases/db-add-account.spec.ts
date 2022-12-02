import { DbAddAccount } from '@/domain/use-cases'
import { Encrypter } from '@/domain/contracts/gateways'
import { AddAccountRepository } from '@/domain/contracts/repositories'

import { MockProxy, mock } from 'jest-mock-extended'

describe('DbAddAccount', () => {
  let id: string
  let name: string
  let email: string
  let password: string
  let accountData: { name: string, email: string, password: string }
  let encrypter: MockProxy<Encrypter>
  let addAccountRepository: MockProxy<AddAccountRepository>
  let sut: DbAddAccount

  beforeAll(() => {
    id = 'any_id'
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
    accountData = { name, email, password }
    encrypter = mock()
    addAccountRepository = mock()
    encrypter.encrypt.mockResolvedValue('hashed_password')
    addAccountRepository.add.mockResolvedValue({ id, name, email, password: 'hashed_password' })
  })

  beforeEach(() => {
    sut = new DbAddAccount(encrypter, addAccountRepository)
  })

  it('Should call Encrypter with correct input', async () => {
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should throw if Encrypter throws', async () => {
    jest.spyOn(encrypter, 'encrypt').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct input', async () => {
    const addSpy = jest.spyOn(addAccountRepository, 'add')

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({ name, email, password: 'hashed_password' })
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('Should throw if Encrypter throws', async () => {
    jest.spyOn(addAccountRepository, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  it('Should return an account on success', async () => {
    const account = await sut.add(accountData)

    expect(account).toEqual({ id, name, email, password: 'hashed_password' })
  })
})
