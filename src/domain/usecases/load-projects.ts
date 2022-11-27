export interface LoadProjects {
  load: (organizationId: string) => Promise<LoadProjects.Result>
}

export namespace LoadProjects {
  export type Result = {
    id: string
    name: string
    description: string
    startDate: Date
    endDate: Date
    members: LoadProjects.Member[]
  }

  export type Member = {
    id: string
    name: string
    email: string
  }
}
