export interface AddProject {
  add: (data: AddProject.Params) => Promise<void>
}

export namespace AddProject {
  export type Params = {
    name: string
    description: string
    status: string
    startDate: Date
    endDate?: Date
  }
}
