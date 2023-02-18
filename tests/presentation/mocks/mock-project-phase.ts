import { AddProjectPhase } from '../../../src/domain/usecases'

export class AddProjectPhaseSpy implements AddProjectPhase {
  params: AddProjectPhase.Params

  async add (params: AddProjectPhase.Params): Promise<void> {
    this.params = params
  }
}
