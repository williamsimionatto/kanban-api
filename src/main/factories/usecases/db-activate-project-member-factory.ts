import { DbActivateProjectMember } from '../../../data/usecases'
import { ActivateProjectMember } from '../../../domain/usecases'
import { ProjectMemberMongoRepository } from '../../../infra/db/mongodb'

export const makeDbActivateProjectMember = (): ActivateProjectMember => {
  const dbActivateProjectMember = new ProjectMemberMongoRepository()
  return new DbActivateProjectMember(dbActivateProjectMember)
}
