import { CheckOrganizationByIdRepository } from '../../../src/data/protocols/db/organization'

export class CheckOrganizationByIdRepositorySpy implements CheckOrganizationByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckOrganizationByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
