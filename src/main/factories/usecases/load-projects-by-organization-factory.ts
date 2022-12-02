import { DbLoadProjectsByOrganization } from '../../../data/usecases'
import { LoadProjectsByOrganization } from '../../../domain/usecases'
import { ProjectMongoRepository } from '../../../infra/db/mongodb'

export const makeDbLoadProjectsByOrganization = (): LoadProjectsByOrganization => {
  const projectRepository = new ProjectMongoRepository()
  return new DbLoadProjectsByOrganization(projectRepository)
}
