import { LoadProjectsByOrganization } from '../../../src/domain/usecases'
import { CheckProjectById } from '../../../src/domain/usecases/check-project-by-id'
import { mockOrganizationProjectsModel } from '../../domain/mocks'

export class CheckProjectByIdSpy implements CheckProjectById {
  id: string
  result = true

  async checkById (id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class LoadProjectsByOrganizationSpy implements LoadProjectsByOrganization {
  organizationId: string
  result = mockOrganizationProjectsModel()

  async loadByOrganization (organizationId: string): Promise<LoadProjectsByOrganization.Result[]> {
    this.organizationId = organizationId
    return this.result
  }
}
