import { AddAccount , Encrypter } from '@/domain/contracts/gateways'
import { AddAccountRepository } from '@/domain/contracts/repositories'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add ({ name, email, password }: AddAccount.Input): Promise<AddAccount.Output> {
    const hashedPassword = await this.encrypter.encrypt(password)
    await this.addAccountRepository.add({ name, email, password: hashedPassword })
    return new Promise(resolve => resolve(null))
  }
}
