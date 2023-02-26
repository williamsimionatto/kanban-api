export interface AddSprint {
  add: (data: AddSprint.Params) => Promise<void>
}

export namespace AddSprint {
  export type Params = {
    name: string
    objective: string
    startDate: Date
    endDate?: Date
    projectId: string
  }
}
