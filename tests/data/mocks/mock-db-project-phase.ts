import { AddProjectPhaseRepository } from '../../../src/data/protocols/db/project'

export class AddProjectPhaseRepositorySpy implements AddProjectPhaseRepository {
  params: AddProjectPhaseRepository.Params
  result = true

  async add (params: AddProjectPhaseRepository.Params): Promise<void> {
    this.params = params
  }
}
