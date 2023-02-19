import { DbAddProjectPhase } from '../../../../data/usecases'
import { AddProjectPhase } from '../../../../domain/usecases'
import { ProjectPhaseMongoRepository } from '../../../../infra/db/mongodb'

export const makeDbAddProjectPhase = (): AddProjectPhase => {
  const projectPhaseMongoRepository = new ProjectPhaseMongoRepository()
  return new DbAddProjectPhase(projectPhaseMongoRepository)
}
