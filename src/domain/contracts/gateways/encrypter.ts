export interface Encrypter {
  encrypt: (input: Encrypter.Input) => Promise<Encrypter.Output>
}

export namespace Encrypter {
  export type Input = string
  export type Output = string
}
