import { AddProjectPhase, CheckProjectPhase } from '../../../src/domain/usecases'

export class AddProjectPhaseSpy implements AddProjectPhase {
  params: AddProjectPhase.Params

  async add (params: AddProjectPhase.Params): Promise<void> {
    this.params = params
  }
}

export class CheckProjectPhaseSpy implements CheckProjectPhase {
  result = false
  params: CheckProjectPhase.Params

  async check (params: CheckProjectPhase.Params): Promise<CheckProjectPhase.Result> {
    this.params = params
    return this.result
  }
}
