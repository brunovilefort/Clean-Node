import { AccountModel } from '@/domain/entities'

export interface AddAccount {
  add: (input: AddAccount.Input) => AddAccount.Output
}

export namespace AddAccount {
  export type Input = { name: string, email: string, password: string }
  export type Output = AccountModel
}
