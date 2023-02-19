import { PhaseType } from './add-project-phase'

export interface CheckProjectPhase {
  check: (params: CheckProjectPhase.Params) => Promise<CheckProjectPhase.Result>
}

export namespace CheckProjectPhase {
  export type Params = {
    projectId: string
    phaseType: PhaseType
  }

  export type Result = boolean
}
