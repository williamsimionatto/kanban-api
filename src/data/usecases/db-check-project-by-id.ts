import { CheckProjectById } from '../../domain/usecases/check-project-by-id'
import { CheckProjectByIdRepository } from '../protocols/db/project'

export class DbCheckProjectById implements CheckProjectById {
  constructor (private readonly checkProjectByIdRepository: CheckProjectByIdRepository) {}

  async checkById (id: string): Promise<CheckProjectById.Result> {
    return await this.checkProjectByIdRepository.checkById(id)
  }
}
