import { DbInactivateProjectMember } from '../../../data/usecases'
import { InactivateProjectMember } from '../../../domain/usecases'
import { ProjectMemberMongoRepository } from '../../../infra/db/mongodb'

export const makeDbInctivateProjectMember = (): InactivateProjectMember => {
  const dbActivateProjectMember = new ProjectMemberMongoRepository()
  return new DbInactivateProjectMember(dbActivateProjectMember)
}
