export interface EditProject {
  edit: (data: EditProject.Params) => Promise<void>
}

export namespace EditProject {
  export type Params = {
    id: string
    name: string
    description: string
    status: string
    startDate: Date
    endDate?: Date
    organizationId: string
  }
}
