import { DbEditProject } from '../../../../data/usecases'
import { EditProject } from '../../../../domain/usecases'
import { ProjectMongoRepository } from '../../../../infra/db/mongodb'

export const makeDbEditProject = (): EditProject => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbEditProject(projectMongoRepository)
}
