import { ProjectModel } from '../model'

export interface LoadProjectById {
  loadById: (projectId: string) => Promise<LoadProjectById.Result>
}

export namespace LoadProjectById {
  export type Result = ProjectModel
}
