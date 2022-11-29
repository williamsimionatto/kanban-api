import { LoadProjectsByOrganization } from '../../domain/usecases/load-projects-by-organization'
import { LoadProjectsByOrganizationRepository } from '../protocols/db/project'

export class DbLoadProjectsByOrganization implements LoadProjectsByOrganization {
  constructor (
    private readonly loadProjectsByOrganizationRepository: LoadProjectsByOrganizationRepository
  ) {}

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganizationRepository.Result[]> {
    return await this.loadProjectsByOrganizationRepository.loadByOrganization(organizationId)
  }
}
