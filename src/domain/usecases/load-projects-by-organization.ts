export interface LoadProjectsByOrganization {
  loadByOrganization: (organizationId: string) => Promise<LoadProjectsByOrganization.Result[]>
}

export namespace LoadProjectsByOrganization {
  export type Result = {
    id: string
    name: string
    description: string
    startDate: Date
    endDate: Date
  }
}
