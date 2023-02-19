import { DbCheckProjectPhase } from '../../../data/usecases'
import { CheckProjectPhase } from '../../../domain/usecases'
import { ProjectPhaseMongoRepository } from '../../../infra/db/mongodb'

export const makeDbCheckProjectPhase = (): CheckProjectPhase => {
  const projectPhaseMongoRepository = new ProjectPhaseMongoRepository()
  return new DbCheckProjectPhase(projectPhaseMongoRepository)
}
