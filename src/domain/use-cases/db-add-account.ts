import { AddAccount , Encrypter } from '@/domain/contracts/gateways'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add ({ password }: AddAccount.Input): Promise<AddAccount.Output> {
    await this.encrypter.encrypt(password)
    return new Promise(resolve => resolve(null))
  }
}
