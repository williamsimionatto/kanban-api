import { LoadProjectById } from '../../domain/usecases/load-project-by-id'
import { LoadProjectByIdRepository } from '../protocols/db/project'

export class DbLoadProjectById implements LoadProjectById {
  constructor (private readonly loadProjectByIdRepository: LoadProjectByIdRepository) {}

  async loadById (id: string): Promise<LoadProjectById.Result> {
    await this.loadProjectByIdRepository.loadById(id)
    return null
  }
}
