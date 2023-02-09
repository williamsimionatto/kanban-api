import { EditProject } from '../../../../domain/usecases'

export interface EditProjectRepository {
  edit: (project: EditProjectRepository.Params) => Promise<void>
}

export namespace EditProjectRepository {
  export type Params = EditProject.Params
  export type Result = boolean
}
