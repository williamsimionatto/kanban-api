import { LoadProjectsByOrganization } from '../../domain/usecases'
import { ok } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class LoadProjectsByOrganizationController implements Controller {
  constructor (private readonly loadProjectsByOrganization: LoadProjectsByOrganization) {}

  async handle (request: LoadProjectsByOrganizationController.Request): Promise<HttpResponse> {
    const projects = await this.loadProjectsByOrganization.loadByOrganization(request.organizationId)
    return ok(projects)
  }
}

export namespace LoadProjectsByOrganizationController {
  export type Request = {
    organizationId: string
  }
}
