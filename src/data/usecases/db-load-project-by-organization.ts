import { LoadProjectsByOrganizationRepository } from '../protocols/db/project'

export class DbLoadProjectsByOrganization implements DbLoadProjectsByOrganization {
  constructor (
    private readonly loadProjectsByOrganizationRepository: LoadProjectsByOrganizationRepository
  ) {}

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganizationRepository.Result[]> {
    const projects = await this.loadProjectsByOrganizationRepository.loadByOrganization(organizationId)
    return projects
  }
}
