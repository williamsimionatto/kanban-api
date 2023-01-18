import { DbLoadProjectById } from '../../../data/usecases'
import { LoadProjectById } from '../../../domain/usecases'
import { ProjectMongoRepository } from '../../../infra/db/mongodb'

export const makeDbLoadProjectById = (): LoadProjectById => {
  const projectRepository = new ProjectMongoRepository()
  return new DbLoadProjectById(projectRepository)
}
