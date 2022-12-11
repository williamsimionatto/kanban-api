export interface CheckProjectMember {
  checkMember: (params: CheckProjectMember.Params) => Promise<CheckProjectMember.Result>
}

export namespace CheckProjectMember {
  export type Params = {
    projectId: string
    memberId: string
  }

  export type Result = boolean
}
