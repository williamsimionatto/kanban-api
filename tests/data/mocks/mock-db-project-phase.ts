import { AddProjectPhaseRepository, CheckProjectPhaseRepository } from '../../../src/data/protocols/db/project'

export class AddProjectPhaseRepositorySpy implements AddProjectPhaseRepository {
  params: AddProjectPhaseRepository.Params
  result = true

  async add (params: AddProjectPhaseRepository.Params): Promise<void> {
    this.params = params
  }
}

export class CheckProjectPhaseRepositorySpy implements CheckProjectPhaseRepository {
  params: CheckProjectPhaseRepository.Params
  result = true

  async checkPhase (params: CheckProjectPhaseRepository.Params): Promise<CheckProjectPhaseRepository.Result> {
    this.params = params
    return this.result
  }
}
