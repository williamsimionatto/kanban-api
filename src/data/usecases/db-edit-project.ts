import { EditProject } from '../../domain/usecases'
import { EditProjectRepository } from '../protocols/db/project'

export class DbEditProject implements EditProject {
  constructor (
    private readonly editProjectRepository: EditProjectRepository
  ) {}

  async edit (projectData: EditProject.Params): Promise<void> {
    await this.editProjectRepository.edit(projectData)
  }
}
