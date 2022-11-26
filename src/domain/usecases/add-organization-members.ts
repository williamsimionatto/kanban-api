export interface AddOrganizationMembers {
  add: (data: AddOrganizationMembers.Params) => Promise<void>
}

export namespace AddOrganizationMembers {
  export type Params = {
    organizationId: string
    accountId: string
  }
}
