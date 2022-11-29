import { LoadProjectsByOrganization } from '../../../../domain/usecases/load-projects-by-organization'

export interface LoadProjectsByOrganizationRepository {
  loadByOrganization: (organizationId: string) => Promise<LoadProjectsByOrganizationRepository.Result[]>
}

export namespace LoadProjectsByOrganizationRepository {
  export type Result = LoadProjectsByOrganization.Result
}
