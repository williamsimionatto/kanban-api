import { CheckProjectPhase } from '../../domain/usecases'
import { CheckProjectPhaseRepository } from '../protocols/db/project'

export class DbCheckProjectPhase implements CheckProjectPhase {
  constructor (private readonly checkProjectPhaseRepository: CheckProjectPhaseRepository) {}

  async check (params: CheckProjectPhase.Params): Promise<CheckProjectPhase.Result> {
    return await this.checkProjectPhaseRepository.checkPhase(params)
  }
}
