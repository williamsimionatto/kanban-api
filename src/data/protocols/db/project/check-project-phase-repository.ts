import { CheckProjectPhase } from '../../../../domain/usecases'

export interface CheckProjectPhaseRepository {
  checkPhase: (params: CheckProjectPhaseRepository.Params) => Promise<CheckProjectPhaseRepository.Result>
}

export namespace CheckProjectPhaseRepository {
  export type Params = CheckProjectPhase.Params
  export type Result = boolean
}
