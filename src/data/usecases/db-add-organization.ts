import { AddOrganization } from '../../domain/usecases'
import { AddOrganizationRepository } from '../protocols/db/organization'

export class DbAddOrganization implements AddOrganization {
  constructor (
    private readonly addOrganizationRepository: AddOrganizationRepository
  ) {}

  async add (organizationData: AddOrganizationRepository.Params): Promise<void> {
    await this.addOrganizationRepository.add(organizationData)
  }
}
