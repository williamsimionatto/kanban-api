import { LoadProjectsByOrganization } from '../../domain/usecases'
import { Controller, HttpResponse } from '../protocols'

export class LoadProjectsByOrganizationController implements Controller {
  constructor (private readonly loadProjectsByOrganization: LoadProjectsByOrganization) {}

  async handle (request: LoadProjectsByOrganizationController.Request): Promise<HttpResponse> {
    await this.loadProjectsByOrganization.loadByOrganization(request.organizationId)
    return null
  }
}

export namespace LoadProjectsByOrganizationController {
  export type Request = {
    organizationId: string
  }
}
