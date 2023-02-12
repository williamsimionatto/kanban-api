import { DbCheckProjectMember } from '../../../data/usecases'
import { CheckProjectMember } from '../../../domain/usecases'
import { ProjectMemberMongoRepository } from '../../../infra/db/mongodb'

export const makeDbCheckProjectMember = (): CheckProjectMember => {
  const projectMemberMongoRepository = new ProjectMemberMongoRepository()
  return new DbCheckProjectMember(projectMemberMongoRepository)
}
