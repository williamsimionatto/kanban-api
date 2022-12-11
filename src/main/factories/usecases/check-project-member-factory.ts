import { DbCheckProjectMember } from '../../../data/usecases'
import { CheckProjectMember } from '../../../domain/usecases'
import { ProjectMongoRepository } from '../../../infra/db/mongodb'

export const makeDbCheckProjectMember = (): CheckProjectMember => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbCheckProjectMember(projectMongoRepository)
}
