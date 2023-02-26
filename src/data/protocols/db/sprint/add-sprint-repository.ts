import { AddSprint } from '../../../../domain/usecases'

export interface AddSprintRepository {
  add: (data: AddSprintRepository.Params) => Promise<void>
}

export namespace AddSprintRepository {
  export type Params = AddSprint.Params
}
