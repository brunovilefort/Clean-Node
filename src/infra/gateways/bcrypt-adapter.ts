import { Hasher } from '@/domain/contracts/gateways'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (input: Hasher.Input): Promise<Hasher.Output> {
    const hash = await bcrypt.hash(input, this.salt)
    return hash
  }
}
