export interface ActivateProjectMember {
  activate: (params: ActivateProjectMember.Params) => Promise<void>
}

export namespace ActivateProjectMember {
  export type Params = {
    projectId: string
    accountId: string
  }
}
