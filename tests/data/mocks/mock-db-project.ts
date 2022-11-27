import { CheckProjectByIdRepository } from '../../../src/data/protocols/db/project'

export class CheckProjectByIdRepositorySpy implements CheckProjectByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckProjectByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
