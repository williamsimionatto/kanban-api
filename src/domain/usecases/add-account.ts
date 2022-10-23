export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    organizationId: string
  }

  export type Result = boolean
}
