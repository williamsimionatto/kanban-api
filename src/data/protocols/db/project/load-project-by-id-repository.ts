import { ProjectModel } from '../../../../domain/model'

export interface LoadProjectByIdRepository {
  loadById: (id: string) => Promise<LoadProjectByIdRepository.Result>
}

export namespace LoadProjectByIdRepository {
  export type Result = ProjectModel
}
