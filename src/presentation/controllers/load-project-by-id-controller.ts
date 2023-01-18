import { LoadProjectById } from '../../domain/usecases/'

import { noContent, ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class LoadProjectByIdController implements Controller {
  constructor (private readonly loadProjectById: LoadProjectById) {}

  async handle (request: LoadProjectByIdController.Request): Promise<HttpResponse> {
    try {
      const project = await this.loadProjectById.loadById(request.projectId)
      return project ? ok(project) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProjectByIdController {
  export type Request = {
    projectId: string
  }
}
