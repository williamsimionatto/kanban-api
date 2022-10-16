import { AddProject } from '../../../../domain/usecases'

export interface AddProjectRepository {
  add: (account: AddProjectRepository.Params) => Promise<void>
}

export namespace AddProjectRepository {
  export type Params = AddProject.Params
  export type Result = boolean
}
