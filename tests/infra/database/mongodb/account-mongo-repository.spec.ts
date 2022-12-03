import { MongoHelper , AccountMongoRepository } from '@/infra/database/mongodb'

describe('AccountMongoRepository', () => {
  let name: string
  let email: string
  let password: string
  let sut: AccountMongoRepository

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    name = 'any_name'
    email = 'any_email@mail.com'
    password = 'any_password'
  })

  beforeEach(() => {
    sut = new AccountMongoRepository()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return an account on success', async () => {
    const account = await sut.add({ name, email, password })

    expect(account).toBeTruthy()
  })
})
