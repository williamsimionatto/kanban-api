import { AddProjectPhase } from '../../domain/usecases'
import { AddProjectPhaseRepository } from '../protocols/db/project'

export class DbAddProjectPhase implements AddProjectPhase {
  constructor (
    private readonly addProjectPhaseRepository: AddProjectPhaseRepository
  ) {}

  async add (data: AddProjectPhaseRepository.Params): Promise<void> {
    await this.addProjectPhaseRepository.add(data)
  }
}
