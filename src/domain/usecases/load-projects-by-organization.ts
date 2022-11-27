export interface LoadProjectsByOrganization {
  load: (organizationId: string) => Promise<LoadProjectsByOrganization.Result>
}

export namespace LoadProjectsByOrganization {
  export type Result = {
    id: string
    name: string
    description: string
    startDate: Date
    endDate: Date
    members: LoadProjectsByOrganization.Member[]
  }

  export type Member = {
    id: string
    name: string
    email: string
  }
}
