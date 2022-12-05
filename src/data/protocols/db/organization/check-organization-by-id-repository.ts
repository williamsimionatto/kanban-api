export interface CheckOrganizationByIdRepository {
  checkById: (id: string) => Promise<CheckOrganizationByIdRepository.Result>
}

export namespace CheckOrganizationByIdRepository {
  export type Result = boolean
}
