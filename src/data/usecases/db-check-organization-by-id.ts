import { CheckOrganizationById } from '../../domain/usecases'
import { CheckOrganizationByIdRepository } from '../protocols/db/organization'

export class DbCheckOrganizationById implements CheckOrganizationById {
  constructor (private readonly checkOrganizationByIdRepository: CheckOrganizationByIdRepository) {}

  async checkById (id: string): Promise<CheckOrganizationById.Result> {
    const exists = await this.checkOrganizationByIdRepository.checkById(id)
    return exists
  }
}
