export interface InactivateProjectMember {
  inactivate: (params: InactivateProjectMember.Params) => Promise<void>
}

export namespace InactivateProjectMember {
  export type Params = {
    projectId: string
    accountId: string
  }
}
