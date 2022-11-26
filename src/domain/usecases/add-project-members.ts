export interface AddProjectMembers {
  add: (data: AddProjectMembers.Params) => Promise<void>
}

export namespace AddProjectMembers {
  export type Params = {
    projectId: string
    accountId: string
  }
}
