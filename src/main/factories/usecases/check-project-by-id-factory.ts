import { DbCheckProjectById } from '../../../data/usecases/db-check-project-by-id'
import { CheckProjectById } from '../../../domain/usecases/check-project-by-id'
import { ProjectMongoRepository } from '../../../infra/db/mongodb'

export const makeDbCheckProjectById = (): CheckProjectById => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbCheckProjectById(projectMongoRepository)
}
