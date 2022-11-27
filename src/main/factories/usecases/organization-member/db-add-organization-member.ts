import { DbAddProjectMembers } from '../../../../data/usecases'
import { AddProjectMembers } from '../../../../domain/usecases'
import { ProjectMongoRepository } from '../../../../infra/db/mongodb'

export const makeDbAddProjectMembers = (): AddProjectMembers => {
  const addProjectMembersRepository = new ProjectMongoRepository()
  return new DbAddProjectMembers(addProjectMembersRepository)
}
