export interface CheckOrganizationById {
  checkById: (id: string) => Promise<CheckOrganizationById.Result>
}

export namespace CheckOrganizationById {
  export type Result = boolean
}
