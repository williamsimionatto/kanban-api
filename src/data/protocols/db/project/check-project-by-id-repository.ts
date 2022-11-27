export interface CheckProjectByIdRepository {
  checkById: (id: string) => Promise<CheckProjectByIdRepository.Result>
}

export namespace CheckProjectByIdRepository {
  export type Result = boolean
}
