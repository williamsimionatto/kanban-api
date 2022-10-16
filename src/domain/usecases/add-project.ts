export interface AddProject {
  add: (account: AddProject.Params) => Promise<AddProject.Result>
}

export namespace AddProject {
  export type Params = {
    name: string
    description: string
    status: string
    startDate: Date
    endDate?: Date
  }

  export type Result = boolean
}
