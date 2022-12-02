import { AddAccount , Hasher } from '@/domain/contracts/gateways'
import { AddAccountRepository } from '@/domain/contracts/repositories'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add ({ name, email, password }: AddAccount.Input): Promise<AddAccount.Output> {
    const hashedPassword = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add({ name, email, password: hashedPassword })
    return account
  }
}
