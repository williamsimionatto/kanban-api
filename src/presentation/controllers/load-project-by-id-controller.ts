import { LoadProjectById } from '../../domain/usecases/load-project-by-id'
import { ok } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class LoadProjectByIdController implements Controller {
  constructor (private readonly loadProjectById: LoadProjectById) {}

  async handle (request: LoadProjectByIdController.Request): Promise<HttpResponse> {
    const project = await this.loadProjectById.loadById(request.projectId)
    return ok(project)
  }
}

export namespace LoadProjectByIdController {
  export type Request = {
    projectId: string
  }
}
