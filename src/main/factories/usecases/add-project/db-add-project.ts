import { DbAddProject } from '../../../../data/usecases/add-project'
import { AddProject } from '../../../../domain/usecases'
import { ProjectMongoRepository } from '../../../../infra/db/mongodb'

export const makeDbAddProject = (): AddProject => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbAddProject(projectMongoRepository)
}
