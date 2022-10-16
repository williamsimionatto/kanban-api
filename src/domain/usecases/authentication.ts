export interface Authentication {
  auth: (authentication: Authentication.Params) => Promise<string>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }
}
