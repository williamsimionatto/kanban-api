import { CheckProjectByIdRepository } from '../../../src/data/protocols/db/project'
import { LoadProjectsByOrganization } from '../../../src/domain/usecases/load-projects-by-organization'
import { mockOrganizationProjectsModel } from '../../domain/mocks'

export class CheckProjectByIdRepositorySpy implements CheckProjectByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckProjectByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadProjectsByOrganizationRepositorySpy implements LoadProjectsByOrganization {
  organizationId: string
  result = mockOrganizationProjectsModel()

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganization.Result[]> {
    this.organizationId = organizationId
    return this.result
  }
}
