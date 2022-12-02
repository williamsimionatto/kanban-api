import { LoadProjectsByOrganization } from '../../domain/usecases'
import { noContent, ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class LoadProjectsByOrganizationController implements Controller {
  constructor (private readonly loadProjectsByOrganization: LoadProjectsByOrganization) {}

  async handle (request: LoadProjectsByOrganizationController.Request): Promise<HttpResponse> {
    try {
      const projects = await this.loadProjectsByOrganization.loadByOrganization(request.organizationId)
      return projects.length ? ok(projects) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProjectsByOrganizationController {
  export type Request = {
    organizationId: string
  }
}
