import { AddProjectPhase } from '../../../../domain/usecases'

export interface AddProjectPhaseRepository {
  add: (data: AddProjectPhaseRepository.Params) => Promise<void>
}

export namespace AddProjectPhaseRepository {
  export type Params = AddProjectPhase.Params
}
