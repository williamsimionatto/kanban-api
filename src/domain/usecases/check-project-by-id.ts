export interface CheckProjectById {
  checkById: (id: string) => Promise<CheckProjectById.Result>
}

export namespace CheckProjectById {
  export type Result = boolean
}
