import { AddAccount } from '@/domain/contracts/gateways'

export interface AddAccountRepository {
  add: (input: AddAccountRepository.Input) => Promise<AddAccountRepository.Output>
}

export namespace AddAccountRepository {
  export type Input = AddAccount.Input
  export type Output = AddAccount.Output
}
