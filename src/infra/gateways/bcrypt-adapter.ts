import { Encrypter } from '@/domain/contracts/gateways'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  async encrypt (input: Encrypter.Input): Promise<Encrypter.Output> {
    const hash = await bcrypt.hash(input, this.salt)
    return hash
  }
}
