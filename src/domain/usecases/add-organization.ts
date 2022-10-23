export interface AddOrganization {
  add: (data: AddOrganization.Params) => Promise<void>
}

export namespace AddOrganization {
  export type Params = {
    name: string
    description: string
  }
}
