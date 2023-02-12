import { DbAddProjectMembers } from '../../../../data/usecases'
import { AddProjectMembers } from '../../../../domain/usecases'
import { ProjectMemberMongoRepository } from '../../../../infra/db/mongodb'

export const makeDbAddProjectMembers = (): AddProjectMembers => {
  const addProjectMemberRepository = new ProjectMemberMongoRepository()
  return new DbAddProjectMembers(addProjectMemberRepository)
}
