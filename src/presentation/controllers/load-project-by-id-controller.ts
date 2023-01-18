import { LoadProjectById } from '../../domain/usecases/'

import { noContent, ok } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class LoadProjectByIdController implements Controller {
  constructor (private readonly loadProjectById: LoadProjectById) {}

  async handle (request: LoadProjectByIdController.Request): Promise<HttpResponse> {
    const project = await this.loadProjectById.loadById(request.projectId)
    return project ? ok(project) : noContent()
  }
}

export namespace LoadProjectByIdController {
  export type Request = {
    projectId: string
  }
}
