import { AddAccount } from '@/domain/contracts/gateways'

export interface AddAccountRepository {
  add: (input: AddAccount.Input) => Promise<AddAccount.Output>
}
