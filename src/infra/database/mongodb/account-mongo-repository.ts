import { MongoHelper } from '@/infra/database/mongodb'
import { AddAccountRepository } from '@/domain/contracts/repositories'

export class AccountMongoRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const res = await accountCollection.insertOne(data)
    return res.insertedId !== null
  }
}
